import { Injectable } from '@nestjs/common';
import { UserTagRepository } from '@user/domain/repositories/user-tag.repository';
import { TagRepository } from '@user/domain/repositories/tag.repository';
import { Prisma } from '@prisma/client';
import { BadRequestException } from '@exception/custom/bad-request.exception';
import { ObjectForItemPositioning } from '@util/item-positioning/item-positioning.type';
import { ItemPositioning } from '@util/item-positioning/item-positioning.util';

@Injectable()
export class UserTagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly userTagRepository: UserTagRepository,
  ) {}

  async checkDuplicateUserTag(insertedTagNames: string[]): Promise<void> {
    if (new Set(insertedTagNames).size !== insertedTagNames.length) {
      throw new BadRequestException('Duplicate tag names are not allowed');
    }
  }

  async updateUserTag(
    userId: string,
    insertedTagNames: string[],
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    // - existingTagNames: '가','나','다','바'
    // - insertedTagNames: '가','다','라','마' ('나' 삭제)
    // - createdTags: '라'object, '마'object
    // - newUserTags: '가'object, '다'object, '라'object, '마'object
    const existingUserTags =
      await this.userTagRepository.findManyByUserId(userId);
    const existingTagNames = existingUserTags.map(
      (userTag) => userTag.tag.name,
    );

    // 새롭게 추가할 태그들: 라, 마
    const createdTags = await Promise.all(
      insertedTagNames
        .filter((tagName) => !existingTagNames.includes(tagName))
        .map(async (tagName) => await this.tagRepository.upsert(tagName, tx)),
    );

    // 삭제할 태그들 -> 나
    await Promise.all(
      existingUserTags
        .filter((userTag) => !insertedTagNames.includes(userTag.tag.name))
        .map(
          async (userTag) =>
            await this.userTagRepository.delete(
              userTag.userId,
              userTag.tagId,
              tx,
            ),
        ),
    );

    // 포지셔닝을 위한 신규 태그 객체화
    const newUserTags = insertedTagNames.map((tagName) => {
      let newUserTag: ObjectForItemPositioning;
      const foundFromExistingUserTags = existingUserTags.find(
        (userTag) => userTag.tag.name === tagName,
      );
      if (foundFromExistingUserTags) {
        newUserTag = {
          id: foundFromExistingUserTags.tagId,
          position: foundFromExistingUserTags.position,
        };
      } else {
        newUserTag = {
          id: createdTags.find((tag) => tag.name === tagName).id,
          position: null,
        };
      }
      return newUserTag;
    });

    const itemsPositioning = new ItemPositioning(newUserTags);
    const calculatedItems = itemsPositioning.calculateItemsPosition();

    await Promise.all(
      calculatedItems.map(async (item) => {
        await this.userTagRepository.upsert(userId, item.id, item.position, tx);
      }),
    );
  }
}
