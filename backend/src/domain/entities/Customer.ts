import { UserRole } from "../enums.js";
import { UserLoginMethod } from "../enums.js";

export interface Customer {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  isBlocked: boolean;
  role: UserRole;
  loginMethod: UserLoginMethod;
  lastLogin: Date;
  readonly createdAt: Date;
  updatedAt: Date;
}