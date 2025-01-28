import config from '../../config';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // see if user exists
  const isUserExists = await User.findOne({ email: payload?.email });
  if (!isUserExists) {
    throw new Error('This User doesnt exists');
  }
  //   check status
  const isActive = isUserExists?.status;
  if (isActive !== 'active') {
    throw new Error('This User account is Deactivated');
  }
  // check password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Password does not match!');
  }

  // create token and send to user

  const jwtPayload = {
    id: isUserExists.id,
    role: isUserExists.role,
    email: isUserExists.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  //   Access with Token
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
