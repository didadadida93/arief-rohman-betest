export const cacheMiddleware = async (req, res, next) => {
  const key = req.params.accountNumber ?? req.params.identityNumber;
  const cacheResult = await req.redisClient.get(key);
  if (cacheResult) {
    res.json(JSON.parse(cacheResult));
  } else {
    next();
  }
}
