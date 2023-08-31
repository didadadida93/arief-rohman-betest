import express from 'express';
import { router } from './src/routes/index.js';

const port = 3000;
const app = express();

app.set('etag', 'strong');
app.set('x-powered-by', false);

app.use('/', router);
app.get('/ping', (_, res) => {
  res.type('text/plain').send('pong');
});

app.listen(port, () => console.log('I Love You', port));
