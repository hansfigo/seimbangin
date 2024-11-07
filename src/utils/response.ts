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
  data?: any;
}

export const createResponse = {
  success: ({ res, message, data }: SuccessResponse) => {
    res.json({
      status: "success",
      code: 200,
      message,
      data,
    });
  },

  error: ({
    res,
    status = 500,
    message = "An error occurred",
    data = null,
  }: ErrorResponse) => {
    res.status(status).json({
      status: "error",
      code: status,
      message,
      data,
    });
  },
};
