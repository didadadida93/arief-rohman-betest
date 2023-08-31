const validationErrorHandler = (err, res) => {
  const errors = Object.keys(err.errors).map(key => {
    return err.errors[key].message;
  });
  res.status(400).json({ message: 'Invalid input', errors });
}

const notFoundErrorHandler = (err, res) => {
  res.status(404).json({
    message: err.message ?? 'Resource not found',
    errors: [],
  });
}

const castErrorHandler = (err, res) => {
  const errorMessage = err.kind === 'ObjectId'
    ? 'Invalid user id'
    : 'Bad request';
  res.status(400).json({
    message: errorMessage,
    errors: [],
  });
}

const badRequestHandler = (err, res) => {
  res.status(400).json({
    message: err.message ?? 'Bad request',
    errors: [],
  });
}

const notAuthorizeHandler = (err, res) => {
  res.status(401).json({
    message: err.message ?? 'Not authorized',
    errors: [],
  });
}

const jsonWebtokenErrorHandler = (_err, res) => {
  res.status(400).json({
    message: 'Invalid token',
    errors: [],
  })
}

const handlers = {
  ValidationError: validationErrorHandler,
  NotFoundError: notFoundErrorHandler,
  CastError: castErrorHandler,
  BadRequest: badRequestHandler,
  NotAuthorize: notAuthorizeHandler,
  JsonWebTokenError: jsonWebtokenErrorHandler,
}

export const errorHandler = (err, _req, res, _next) => {
  const handler = handlers[err.name];

  if (!handler) {
    res.status(500).json({ message: 'Internal server error', errors: [] });
  } else {
    handler(err, res);
  }
}
