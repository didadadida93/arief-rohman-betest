import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const generateToken = data => {
  return jwt.sign(data, secret);
}

export const verifyToken = token => {
  return jwt.verify(token, secret)
}
