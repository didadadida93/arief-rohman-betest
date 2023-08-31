import { Router } from 'express';
import * as userService from '../services/user.service.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

export const v1Router = Router();

// v1Router.get('/users', userService.getUsers);
v1Router.post('/user', userService.postUser);
v1Router.get(
  '/user/accountNumber/:accountNumber',
  cacheMiddleware,
  userService.findUserByAccountNumber
);
v1Router.get(
  '/user/identityNumber/:identityNumber',
  cacheMiddleware,
  userService.findUserByIdentityNumber
);
v1Router.patch('/user/:userId', userService.patchUser);
v1Router.delete('/user/:userId', userService.deleteUser);
