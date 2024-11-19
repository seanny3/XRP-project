import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ThirdPartyProvider } from '@prisma/client';
import { OpenAuthInfoDto } from '@user/interface/dtos/common/open-auth-info.dto';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { EnvService } from '@env/services/env.service';
import { ENVIRONMENT_KEY } from '@env/variables';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  ThirdPartyProvider.GOOGLE,
) {
  constructor(private readonly env: EnvService) {
    super();
  }

  async validate(
    request: Request,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { code } = request.body;

    // Access Token 요청
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: this.env.get<string>(ENVIRONMENT_KEY.GOOGLE_CLIENT_ID),
        client_secret: this.env.get<string>(
          ENVIRONMENT_KEY.GOOGLE_CLIENT_SECRET,
        ),
        redirect_uri: this.env.get<string>(ENVIRONMENT_KEY.GOOGLE_REDIRECT_URI),
        grant_type: 'authorization_code',
        code,
      },
    );

    const { access_token: accessToken, refresh_token: refreshToken } =
      tokenResponse.data;

    // 사용자 정보 요청
    const profileResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return done(
      null,
      plainToInstance(OpenAuthInfoDto, {
        email: profileResponse.data.email,
        providerId: profileResponse.data.sub,
        provider: ThirdPartyProvider.GOOGLE,
        accessToken,
        refreshToken,
      }),
    );
  }
}
