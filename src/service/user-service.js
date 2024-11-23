import { validate } from '../validation/validation.js';
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../validation/user-validation.js';
import { prismaClient } from '../app/database.js';
import bcrypt from 'bcrypt';
import { ResponseError } from '../error/response-error.js';
import { generateToken, verifyToken } from './jwt-service.js';
import jwt from 'jsonwebtoken';

const register = async request => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: { username: user.username },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'User already exists!');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async request => {
  const user = validate(loginUserValidation, request);

  const checkAccountUserIsExist = await prismaClient.user.findFirst({
    where: { username: user.username },
  });

  if (!checkAccountUserIsExist) {
    throw new ResponseError(404, 'Username or password is incorrect!');
  }

  const isPasswordValid = await bcrypt.compare(
    user.password,
    checkAccountUserIsExist.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError(404, 'Username or password is incorrect!');
  }

  // await prismaClient.user.update({
  //   where: { username: user.username },
  //   data: { token },
  // });

  return generateToken(user);
};

const update = async request => {
  const user = validate(updateUserValidation, request);

  if (!user) {
    throw new ResponseError(400, 'Password and username must not be blank!');
  }

  const isUserExist = await prismaClient.user.findFirst({
    where: { username: user.username },
  });

  if (!isUserExist) {
    throw new ResponseError(404, "User doesn't exists!");
  }

  user.new_password = await bcrypt.hash(user.new_password, 10);

  const update = await prismaClient.user.update({
    where: { username: user.username },
    data: { name: user.name, password: user.new_password },
    select: {
      name: true,
    },
  });

  if (!update) {
    return 'Update failed!';
  }

  return 'updated successfully!';
};

export default { register, login, update };
