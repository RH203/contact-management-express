import express from 'express';
import { publicApi } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';

export const web = express();
web.use(express.json());

web.use(publicApi);

web.use(errorMiddleware);
