import { Router } from 'express';
import { userService } from '../../services/user.service.js';

export const v1Router = Router();

v1Router.get('/user', userService.getUser);
v1Router.post('/user', userService.postUser);
v1Router.patch('/user/:userId', userService.patchUser);
v1Router.delete('/user/:userId', userService.deleteUser);
