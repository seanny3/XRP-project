import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupVersioning(app: NestExpressApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
}
