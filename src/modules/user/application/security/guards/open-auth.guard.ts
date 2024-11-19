import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthExceptionEnum } from '@exception/enum/auth.enum';
import { UnauthorizedException } from '@exception/custom/unauthorized.exception';
import { OpenAuthInfoDto } from '@user/interface/dtos/common/open-auth-info.dto';
import { ThirdPartyProvider } from '@prisma/client';
import { OpenAuthRequestBodyDto } from '@user/interface/dtos/request/open-auth.body.dto';
import { BadRequestException } from '@exception/custom/bad-request.exception';
import { AuthGuard } from '@nestjs/passport';
import { BaseException } from '@exception/custom/base.exception';

@Injectable()
export class OpenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { provider, code }: OpenAuthRequestBodyDto = request.body;

    if (!provider || !Object.values(ThirdPartyProvider).includes(provider)) {
      throw new BadRequestException(AuthExceptionEnum.UnsupportedProvider);
    }

    return new DynamicOpenAuthGuardWrapper(provider).run(context);
  }
}

class DynamicOpenAuthGuardWrapper {
  private readonly guard: any;

  constructor(strategy: string) {
    this.guard = new (AuthGuard(strategy))();
    this.guard.handleRequest = function (
      exception: BaseException,
      user: OpenAuthInfoDto,
      info: any,
      context: ExecutionContext,
    ): OpenAuthInfoDto {
      const request = context.switchToHttp().getRequest();
      if (user) {
        request.auth = user; // request.auth에 인증 정보 저장
        return user;
      }

      if (exception instanceof BaseException) {
        throw exception;
      } else {
        throw new UnauthorizedException(AuthExceptionEnum.InvalidOAuthToken);
      }
    };
  }

  async run(context: ExecutionContext): Promise<boolean> {
    await this.guard.canActivate(context);
    return true;
  }
}
