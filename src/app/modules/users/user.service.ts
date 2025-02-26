/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';

const createNewUserToDb = async (
  name: string,
  email: string,
  password: string,
) => {
  const isUserExists = await User.find({ email: email });
  if (isUserExists.length) {
    throw new Error('User already exists');
  }
  const user: TUser = {
    id: '',
    password: '',
    role: 'user',
    name: '',
    email: '',
    status: 'active',
  };
  user.name = name;
  user.email = email;
  user.password = password;
  user.id = Math.floor(10000 + Math.random() * 90000).toString();

  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDb = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const changeStatusOfUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not Exits');
  }
  if (user) {
    // Toggle the status
    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();

    return user;
  }
};

// update adress and city
const updateUserToDb = async (userId: string, updateData: any) => {
  const allowedFields = ['address', 'city', 'phone'];
  const updateKeys = Object.keys(updateData);

  const invalidFields = updateKeys.filter(
    (key) => !allowedFields.includes(key),
  );
  if (invalidFields.length > 0) {
    throw new Error(
      `Invalid fields for update: ${invalidFields.join(
        ', ',
      )}. Only 'address' 'phone' and 'city' can be updated.`,
    );
  }

  // Find and update the user
  const updatedUser = await User.findOneAndUpdate(
    { _id: new Types.ObjectId(userId) },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new Error('User not found.');
  }

  return updatedUser;
};

export const UserServices = {
  createNewUserToDb,
  getAllUserFromDb,
  changeStatusOfUser,
  updateUserToDb,
  getSingleUserFromDb,
};
