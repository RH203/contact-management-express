import winston from 'winston';
import { json } from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console({})],
});
