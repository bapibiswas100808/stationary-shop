/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await UserServices.createNewUserToDb(name, email, password);

    res.status(200).json({
      success: true,
      message: 'Registered Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};
const getALlUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: 'All Users Retrived Succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const result = await UserServices.getSingleUserFromDb(email);

    res.status(200).json({
      success: true,
      message: 'Users Retrived Succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};
const changeStatus = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const result = await UserServices.changeStatusOfUser(email);

    res.status(200).json({
      success: true,
      message: 'Status Changed Succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

const updateUserAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { address, city, phone } = req.body;

  try {
    const updateData: Record<string, any> = {};
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (phone !== undefined) updateData.phone = phone;

    // Call the service to update the user
    const updatedUser = await UserServices.updateUserToDb(id, updateData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update user.',
    });
  }
};

export const UserControllers = {
  createUser,
  getALlUser,
  changeStatus,
  updateUserAddress,
  getSingleUser,
};
