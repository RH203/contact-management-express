import {validate} from '../validation/validation.js';
import {loginUserValidation, registerUserValidation,} from '../validation/user-validation.js';
import {prismaClient} from '../app/database.js';
import bcrypt from 'bcrypt';
import {ResponseError} from '../error/response-error.js';
import {generateToken} from "./jwt-service.js";

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

const login = async (request) => {
  const user = validate(loginUserValidation, request);

  const checkAccountUserIsExist = await prismaClient.user.findFirst({
    where: { username: user.username },
  });

  if (!checkAccountUserIsExist) {
    throw new ResponseError(404, 'Username or password is incorrect!');
  }

  const isPasswordValid = await bcrypt.compare(user.password, checkAccountUserIsExist.password);
  if (!isPasswordValid) {
    throw new ResponseError(404, 'Username or password is incorrect!');
  }

  const token = generateToken(user);

  await prismaClient.user.update({
    where: { username: user.username },
    data: { token },
  });

  return token;
};

export default { register, login};
