import { UserLoginMethod } from "../../domain/enums.js";
import { UserRole } from "../../domain/enums.js";

export interface CreateCustomerRequestDTO {
    name: string;
    email: string;
    phone: string;
    password: string;
    loginMethod: UserLoginMethod;
    role?: UserRole
}

export interface CreateCustomerResponseDTO {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    loginMethod: UserLoginMethod;
    createdAt: Date;
    updatedAt: Date;
}