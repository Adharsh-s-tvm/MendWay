import { Role } from "../enums";

export interface Customer {
    customerId: string,
    name: string,
    email: string,
    phone?: number,
    passwordhash: string,
    isBlocked?: boolean,
    profilePictureUrl?: string,
    role: Role,
    lastLoginAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

