import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResponseFormatInterceptor } from '@interceptor/response-format.interceptor';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@persistence/prisma/prisma.module';
import { CacheModule } from '@cache/cache.module';
import { EnvModule } from '@env/env.module';
import { MailerModule } from '@mailer/mailer.module';
import { AwsS3Module } from '@persistence/s3/aws-s3.module';
import { JwtAuthModule } from '@jwt/jwt.module';
import { AdminModule } from '@module/admin/admin.module';
import { EventModule } from '@event/event.module';
import { SecurityModule } from '@shared/security/security.module';

@Module({
  imports: [
    SecurityModule,
    UserModule,
    EventModule,
    AdminModule,
    PrismaModule,
    CacheModule,
    EnvModule,
    MailerModule,
    AwsS3Module,
    JwtAuthModule,
  ],
  providers: [ResponseFormatInterceptor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
