import { Role } from "../../domain/enums";

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

export interface LoginResponseDTO {
    user: {
        user_id: string;
        user_name: string;
        email_address: string;
        user_role: Role;
        phone_number?: number;
        profileImageUrl?: string;
        isBlocked: boolean;
    };
    accessToken: string;
    refreshToken: string;
}