import { Router } from 'express';
import { v1Router } from './v1.routes.js';
import { authorization } from '../middlewares/authorization.js';
import { oauthRouter } from './oauth.routes.js';

export const router = Router();

router.use('/v1', authorization, v1Router);
router.use('/oauth', oauthRouter)
