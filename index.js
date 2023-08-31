import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { router } from './src/routes/index.js';
import { setupMongoDb } from './src/config/mongodb.js';
import { errorHandler } from './src/middlewares/error.handler.js';
import { redisMiddleware } from './src/middlewares/redis.middleware.js';
import { redisClient } from './src/config/redis.js';

const port = process.env.PORT;

const main = async () => {
  await setupMongoDb();
  await redisClient.connect();

  const app = express();

  app.set('etag', 'strong');
  app.set('x-powered-by', false);

  app.use(morgan('common'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(redisMiddleware(redisClient));

  app.use('/', router);
  app.get('/ping', (_, res) => {
    res.type('text/plain').send('pong');
  });
  app.use(errorHandler);

  app.listen(port, () => console.log('server running port:', port));
}

main().catch(console.error);
