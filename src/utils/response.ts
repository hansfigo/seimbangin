import { Response } from "express";

export const createResponse = {
  success: (res: Response, message: string, data?: any) => {
    res.status(200).json({
      status: "success",
      message: message,
      data: data,
    });
  },

  error: (res: Response, status: number, message: string) => {
    res.status(status).json({
      status: "error",
      message: message,
    });
  },
};
