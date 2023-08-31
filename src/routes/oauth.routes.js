import { Router } from 'express';
import * as oauthService from '../services/oauth.service.js';

export const oauthRouter = Router();

oauthRouter.post('/register', oauthService.register);
oauthRouter.post('/token', oauthService.token);
