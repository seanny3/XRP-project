import * as Joi from 'joi';

export const SWAGGER_KEY = {
  SWAGGER_AUTH_USER: 'SWAGGER_AUTH_USER',
  SWAGGER_AUTH_PASSWORD: 'SWAGGER_AUTH_PASSWORD',
} as const;

export const SWAGGER_KEY_VALIDATOR = {
  SWAGGER_AUTH_USER: Joi.string().required(),
  SWAGGER_AUTH_PASSWORD: Joi.string().required(),
} as const;
