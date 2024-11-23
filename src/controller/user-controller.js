import userService from '../service/user-service.js';
import { logger } from '../app/logger.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      token: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    logger.info(req.body);
    const result = await userService.update(req.body);

    res.status(200).json({
      status: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { register, login, updateUser };
