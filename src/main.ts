import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '@app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvService } from '@env/services/env.service';
import { ENVIRONMENT_KEY } from '@env/variables';
import { setupVersioning } from '@bootstrap/version.setup';
import { corsSetup } from '@bootstrap/cors.setup';
import { globalsSetup } from '@bootstrap/globals.setup';
import { swaggerSetup } from '@bootstrap/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setupVersioning(app);
  corsSetup(app);
  globalsSetup(app);
  swaggerSetup(app);

  const env = app.get<EnvService>(EnvService);
  const PORT = env.get<number>(ENVIRONMENT_KEY.PORT) || 8080;
  Logger.log(`🐥 Server is Running on PORT ${PORT}! 🐥`);

  await app.listen(PORT, '0.0.0.0');
}
bootstrap().then();
