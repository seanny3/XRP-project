import * as Joi from 'joi';

export const GOOGLE_KEY = {
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
  GOOGLE_REDIRECT_URI: 'GOOGLE_REDIRECT_URI',
} as const;

export const GOOGLE_KEY_VALIDATOR = {
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_REDIRECT_URI: Joi.string().required(),
} as const;
