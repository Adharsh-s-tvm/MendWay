import { Customer } from "../../domain/entities/Customer";
import { UserRequestDTO, UserResponseDTO } from "../dtos/UserDTO";

export class userMapper {
    static toDomain(userData : UserRequestDTO, hashedPassword: string, customerId: string): Customer{
        return {
            customerId,
            name: userData.user_name,
            email: userData.email_address,
            passwordhash: hashedPassword,
            phone: userData.phone_number,
            role: userData.user_role,
            isBlocked: false,
            profilePictureUrl: '',
            createdAt: new Date(),
            lastLoginAt: new Date(),
            updatedAt: new Date(0)
        }
    }
    static toResponseDTO(customerData: Customer): UserResponseDTO {
        return {
            user_id: customerData.customerId,
            user_name: customerData.name,
            email_address: customerData.email,
            phone_number: customerData.phone,
            user_role: customerData.role,
            profileImageUrl: customerData.profilePictureUrl,
            isBlocked: customerData.isBlocked ?? false,
        }
    }
}