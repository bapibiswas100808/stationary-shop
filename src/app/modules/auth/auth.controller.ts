/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Logged in Successfully',
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

export const AuthControllers = {
  loginUser,
};
