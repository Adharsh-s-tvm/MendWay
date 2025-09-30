import { Role } from "../Enums";

export interface Customer {
    customerId: string,
    name: string,
    email: string,
    phone: number,
    password: string,
    isBlocked?: boolean,
    profilePictureUrl?: string,
    role: Role.CUSTOMER,
    lastLoginAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

