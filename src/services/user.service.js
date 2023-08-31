const dummyUser = {
  id: 'id',
  userName: 'username',
  accountNumber: 'accountnumber',
  emailAddress: 'emailaddress',
  identityNumber: 'identitynumber',
};

const getUser = (_, res) => {
  res.json(dummyUser);
}

const postUser = (_, res) => {
  res.status(201).json(dummyUser);
}

const patchUser = (_, res) => {
  res.json(dummyUser);
}

const deleteUser = (_, res) => {
  res.json(dummyUser);
}

export const userService = {
  getUser, postUser, patchUser, deleteUser
}
