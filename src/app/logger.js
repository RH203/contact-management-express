import winston from 'winston';
import { json } from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json({
    space: 1,
  }),
  transports: [new winston.transports.Console({})],
});
