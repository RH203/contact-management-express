import express from 'express';
import userController from '../controller/user-controller.js';
import { userMiddleware } from '../middleware/user-middleware.js';

const publicApi = new express.Router();

// Register User
publicApi.post('/api/users', userController.register);
// Login User
publicApi.get('/api/users/login', userController.login);
// Update username or password
publicApi.patch('/api/users/update', userMiddleware, userController.updateUser);
export { publicApi };
