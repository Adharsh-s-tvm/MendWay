import { Role } from "../../domain/Enums";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { UserRequestDTO, UserResponseDTO } from "../dtos/UserDTO";
import { userMapper } from "../mappers/UserMapper";
import { IGenerateUserID } from "../services/IGenerateUserID";
import { IPasswordHasher } from "../services/IPasswordHasher";

export class RegisterCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly userIdGenerator: IGenerateUserID
    ) { }

    async execute(userData: UserRequestDTO): Promise<UserResponseDTO> {
        const existingUser = await this.customerRepository.findByEmail(userData.email_address);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordHasher.hash(userData.password);
        const customerId = await this.userIdGenerator.create();
        const newCustomer = await this.customerRepository.create({
            customerId: customerId,
            name: userData.user_name,
            email: userData.email_address,
            passwordhash: hashedPassword,
            phone: userData.phone_number,
            role: userData.user_role,
            isBlocked: false,
            profilePictureUrl: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLoginAt: new Date(0), // default or null if you allow it
        });
        return userMapper.toResponseDTO(newCustomer);
    }
}