import { Role } from "../../domain/Enums";

export interface UserRequestDTO {
    user_name: string;
    email_address: string;
    password: string;
    phone_number?: number;
    user_role: Role
}

export interface UserResponseDTO {
    user_id: string;
    user_name : string;
    email_address: string;
    phone_number?: number;
    user_role: Role;
    profileImageUrl?: string;
    isBlocked: boolean;
}

export interface LoginUserDTO{
    email_address: string;
    password: string;
}    