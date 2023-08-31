import { CredentialModel } from '../models/credential.js';
import { generateToken } from '../utils/jwt.helper.js';

export const register = async (req, res, next) => {
  try {
    const cred = await CredentialModel.create({ credname: req.body.username });
    const token = generateToken({ id: cred._id });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

export const token = async (req, res, next) => {
  try {
    if (!req.body.username) {
      throw { name: 'BadRequest', message: 'Missing username' };
    }
    const cred = await CredentialModel.findOne({ credname: req.body.username })
      .exec();

    if (!cred) {
      throw { name: 'BadRequest', message: 'Bad credential' };
    }

    const token = generateToken({ id: cred._id });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
