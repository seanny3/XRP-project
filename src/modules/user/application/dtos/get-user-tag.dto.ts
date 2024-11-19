import { Exclude, Expose, Type } from 'class-transformer';
import { GetTagDto } from '@user/application/dtos/get-tag.dto';

@Exclude()
export class GetUserTagDto {
  @Expose()
  userId: string;

  @Expose()
  tagId: string;

  @Expose()
  position: bigint;

  @Expose()
  @Type(() => GetTagDto)
  tag: GetTagDto;
}
