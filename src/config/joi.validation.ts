import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(3005),
  DEFAULT_LIMIT: joi.number().default(6)
})