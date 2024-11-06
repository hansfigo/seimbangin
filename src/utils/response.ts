import { Response } from "express";

interface SuccessResponse {
  res: Response;
  message: string;
  data?: any;
}

interface ErrorResponse {
  res: Response;
  status: number;
  message: string;
}

export const createResponse = {
  success: ({ res, message, data }: SuccessResponse) => {
    res.json({
      status: "success",
      message,
      data,
    });
  },

  error: ({ res, status, message }: ErrorResponse) => {
    res.status(status).json({
      status: "error",
      message,
    });
  },
};
