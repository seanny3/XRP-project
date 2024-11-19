import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import {
  DATABASE_KEY,
  DATABASE_KEY_VALIDATOR,
} from '@env/variables/constants/database.constant';
import {
  REDIS_KEY,
  REDIS_KEY_VALIDATOR,
} from '@env/variables/constants/cache.constant';
import {
  JWT_KEY,
  JWT_KEY_VALIDATOR,
} from '@env/variables/constants/jwt.constant';
import {
  AWS_S3_KEY,
  AWS_S3_KEY_VALIDATOR,
  AWS_SES_KEY,
  AWS_SES_KEY_VALIDATOR,
} from '@env/variables/constants/aws.constant';
import {
  SWAGGER_KEY,
  SWAGGER_KEY_VALIDATOR,
} from '@env/variables/constants/swagger.constant';
import {
  RAG_KEY,
  RAG_KEY_VALIDATOR,
} from '@env/variables/constants/rag.constant';
import {
  GOOGLE_KEY,
  GOOGLE_KEY_VALIDATOR,
} from '@env/variables/constants/oauth.constant';

export const ENVIRONMENT_KEY = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  ...DATABASE_KEY,
  ...REDIS_KEY,
  ...JWT_KEY,
  ...AWS_S3_KEY,
  ...AWS_SES_KEY,
  ...SWAGGER_KEY,
  ...RAG_KEY,
  ...GOOGLE_KEY,
} as const;

export const ENVIRONMENT_KEY_VALIDATOR: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  validationSchema: Joi.object({
    PORT: Joi.number().required(),
    ...DATABASE_KEY_VALIDATOR,
    ...REDIS_KEY_VALIDATOR,
    ...JWT_KEY_VALIDATOR,
    ...AWS_S3_KEY_VALIDATOR,
    ...AWS_SES_KEY_VALIDATOR,
    ...SWAGGER_KEY_VALIDATOR,
    ...RAG_KEY_VALIDATOR,
    ...GOOGLE_KEY_VALIDATOR,
  }),
};
