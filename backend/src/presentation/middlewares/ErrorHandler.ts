import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enums/httpCodes";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = HttpStatusCode.INTERNAL_SERVER, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error:", err);

  // If known AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle unknown/unexpected errors
  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    status: "error",
    message: err.message || "Internal server error",
  });
}
