export const redisMiddleware = (redisClient) => (req, _, next) => {
  req.redisClient = redisClient;
  next();
}
