import { UserModel } from '../models/user.js';

export const getUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await UserModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await UserModel.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
}

export const postUser = async (req, res, next) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({
      message: 'User created',
      user: newUser.transform(),
    });
  } catch (error) {
    next(error);
  }
}

export const patchUser = async (req, res, next) => {
  const { userName, emailAddress } = req.body;
  let changed = false;
  try {
    if (!userName && !emailAddress) {
      throw {
        name: 'ValidationError',
        errors: {
          patchInput: {
            message: 'user name or email address is missing',
          }
        }
      }
    }

    const user = await UserModel.findById(req.params.userId).exec();

    if (!user) {
      throw { name: 'NotFoundError', message: 'User not found' };
    }

    if (userName && userName !== user.userName) {
      changed = true;
      user.userName = userName;
    }

    if (emailAddress && emailAddress !== user.emailAddress) {
      changed = true;
      user.emailAddress = emailAddress;
    }

    if (changed) {
      await user.save({ validateModifiedOnly: true });
      await req.redisClient.del(user.accountNumber, user.identityNumber);
    }

    res.json({ message: 'User updated' });
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId).exec();

    if (!user) {
      throw { name: 'NotFoundError', message: 'User not found' };
    }

    await UserModel.findByIdAndDelete(req.params.userId);
    await req.redisClient.del(user.accountNumber, user.identityNumber);

    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}

export const findUserByAccountNumber = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      accountNumber: req.params.accountNumber,
    }).exec();

    if (!user) {
      throw { name: 'NotFoundError', message: 'User not found' };
    }

    await req.redisClient.set(
      req.params.accountNumber,
      JSON.stringify(user.transform()),
      {
        EX: 60 * 60 * 24, // 1 day
        NX: true,
      },
    );

    res.json(user.transform());
  } catch (error) {
    next(error)
  }
}

export const findUserByIdentityNumber = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      identityNumber: req.params.identityNumber,
    }).exec();

    if (!user) {
      throw { name: 'NotFoundError', message: 'User not found' };
    }

    await req.redisClient.set(
      req.params.identityNumber,
      JSON.stringify(user.transform()),
      {
        EX: 60 * 60 * 24, // 1 day
        NX: true,
      },
    );

    res.json(user.transform());
  } catch (error) {
    next(error)
  }
}
