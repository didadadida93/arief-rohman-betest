import { CredentialModel } from "../models/credential.js";
import { verifyToken } from "../utils/jwt.helper.js";

export const authorization = async (req, _res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: 'BadRequest', message: 'Missing authorization token' };
    }

    const [ prefix, token ] = req.headers.authorization.split(' ');
    if (prefix !== 'Bearer') {
      throw { name: 'BadRequest', message: 'Missing authorization token' };
    }

    const payload = verifyToken(token);

    const cred = await CredentialModel.findById(payload.id).exec();

    if (!cred) {
      throw { name: 'NotAuthorized' };
    }

    next();
  } catch (error) {
    next(error);
  }
}
