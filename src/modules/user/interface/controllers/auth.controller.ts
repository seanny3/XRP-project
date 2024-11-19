import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '@shared/decorators/user.request.decorator';
import { UserAgent } from '@shared/decorators/user-agent.request.decorator';
import { EmailAuthGuard } from '@user/application/security/guards/email-auth.guard';
import { OpenAuthGuard } from '@user/application/security/guards/open-auth.guard';
import { UserAgentDto } from '@user/interface/dtos/common/user-agent.dto';
import { GetCreateUserTokenDto } from '@user/application/dtos/get-create-user-token.dto';
import { plainToInstance } from 'class-transformer';
import { AuthTokenPayloadDto } from '@user/interface/dtos/common/auth-token-payload.dto';
import { AuthTokenCookieService } from '@user/infrastructure/cookie/services/auth-token.cookie';
import { AuthFeature } from '@user/application/features/auth.feature';
import { SendOtpRequestBodyDto } from '@user/interface/dtos/request/send-otp.body.dto';
import { RefreshGuard } from '@user/application/security/guards/refresh.guard';
import { GetAuthTokensDto } from '@user/application/dtos/get-auth-tokens.dto';
import { GetAuthTokensResponseDto } from '@user/interface/dtos/response/get-auth-tokens.response.dto';
import { LoginInfoDto } from '@user/interface/dtos/common/login-info.dto';
import { Member } from '@shared/security/roles/member.role.decorator';
import { ApiAuth } from '@user/interface/controllers/swagger/auth.swagger';
import { OpenAuthInfoDto } from '@user/interface/dtos/common/open-auth-info.dto';
import { Auth } from '@shared/decorators/auth.request.decorator';
import { OpenAuthRequestBodyDto } from '@user/interface/dtos/request/open-auth.body.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authFeature: AuthFeature,
    private readonly authTokenCookieService: AuthTokenCookieService,
  ) {}

  @ApiAuth.SendOtpByEmail({ summary: 'OTP(인증번호) 발급 ✅' })
  @Post('otp')
  @HttpCode(HttpStatus.OK)
  async sendOtpByEmail(@Body() body: SendOtpRequestBodyDto): Promise<void> {
    await this.authFeature.sendOtp(body.method, body.to);
  }

  @ApiAuth.GetAuthTokensByEmail({
    summary: '이메일 인증 및 로그인 (토큰발급) ✅',
  })
  @Post('token/email')
  @UseGuards(EmailAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAuthTokensByEmail(
    @Auth() { email }: any,
    @UserAgent() userAgent: UserAgentDto,
    @Ip() ip: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<GetAuthTokensResponseDto> {
    const loginInfoDto = plainToInstance(LoginInfoDto, {
      email,
      ip,
      userAgent,
    });
    const tokens = await this.authFeature.login(loginInfoDto);

    if (tokens instanceof GetAuthTokensDto) {
      await this.authTokenCookieService.set(response, tokens);
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: false,
      });
    } else if (tokens instanceof GetCreateUserTokenDto) {
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: true,
        createUserToken: tokens.createUserToken,
      });
    }
  }

  @ApiAuth.GetAuthTokensByOpenAuth({
    summary: 'OAuth2 인증 및 로그인 (토큰발급) ✅',
  })
  @Post('token/oauth')
  @UseGuards(OpenAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAuthTokensByOpenAuth(
    @Auth() openAuthInfoDto: OpenAuthInfoDto,
    @UserAgent() userAgent: UserAgentDto,
    @Ip() ip: string,
    @Body() openAuthRequestBodyDto: OpenAuthRequestBodyDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<GetAuthTokensResponseDto> {
    const loginInfoDto = plainToInstance(LoginInfoDto, {
      email: openAuthInfoDto.email,
      ip,
      userAgent,
      oauthInfo: openAuthInfoDto,
    });
    const tokens = await this.authFeature.login(loginInfoDto);

    if (tokens instanceof GetAuthTokensDto) {
      await this.authTokenCookieService.set(response, tokens);
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: false,
      });
    } else if (tokens instanceof GetCreateUserTokenDto) {
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: true,
        createUserToken: tokens.createUserToken,
      });
    }
  }

  @ApiAuth.DeleteAuthTokens({ summary: '로그아웃 (토큰삭제) ✅' })
  @Delete('token')
  @Member()
  @HttpCode(HttpStatus.OK)
  async deleteAuthTokens(
    @User() payload: AuthTokenPayloadDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authFeature.deleteAuthTokens(payload);
    await this.authTokenCookieService.clear(response);
  }

  @ApiAuth.RefreshAuthTokens({ summary: '토큰 재발급 (자동 로그인) ✅' })
  @Put('token')
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refreshAuthTokens(
    @User() payload: AuthTokenPayloadDto,
    @UserAgent() userAgent: UserAgentDto,
    @Ip() ip: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<GetAuthTokensResponseDto> {
    const loginInfoDto = plainToInstance(LoginInfoDto, {
      email: payload.email,
      ip,
      userAgent,
    });
    const tokens = await this.authFeature.login(loginInfoDto);
    if (tokens instanceof GetAuthTokensDto) {
      await this.authTokenCookieService.set(response, tokens);
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: false,
      });
    } else if (tokens instanceof GetCreateUserTokenDto) {
      return plainToInstance(GetAuthTokensResponseDto, {
        isNewUser: true,
        createUserToken: tokens.createUserToken,
      });
    }
  }
}
