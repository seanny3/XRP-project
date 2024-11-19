import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from '@env/services/env.service';
import * as expressBasicAuth from 'express-basic-auth';
import { ENVIRONMENT_KEY } from '@env/variables';
import { ApiCookieAuthTokenType } from '@swagger/builder/token-config.builder';

export function swaggerSetup(app: NestExpressApplication) {
  const env = app.get<EnvService>(EnvService);

  app.use(
    ['/v1/docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [env.get<string>(ENVIRONMENT_KEY.SWAGGER_AUTH_USER)]: env.get<string>(
          ENVIRONMENT_KEY.SWAGGER_AUTH_PASSWORD,
        ),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('2.0.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
        in: 'header',
        description: 'Enter email(username) and code(password)',
      },
      'emailAuth',
    )
    .addCookieAuth(
      ApiCookieAuthTokenType.ACCESS_TOKEN,
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter access token',
      },
      ApiCookieAuthTokenType.ACCESS_TOKEN,
    )
    .addCookieAuth(
      ApiCookieAuthTokenType.REFRESH_TOKEN,
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter refresh token',
      },
      ApiCookieAuthTokenType.REFRESH_TOKEN,
    )
    .addCookieAuth(
      ApiCookieAuthTokenType.CREATE_USER_TOKEN,
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter signup token',
      },
      ApiCookieAuthTokenType.CREATE_USER_TOKEN,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
