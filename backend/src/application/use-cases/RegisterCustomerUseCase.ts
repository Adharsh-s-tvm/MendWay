// src/application/use-cases/RegisterCustomerUseCase.ts
import { IRegisterCustomerUseCase } from "../interfaces/IRegisterCustomerUseCase";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { IPasswordHasher } from "../services/IPasswordHasher";
import { IGenerateUserID } from "../services/IGenerateUserID";
import { ITokenService } from "../services/ITokenService";
import { UserRequestDTO, UserResponseDTO } from "../dtos/UserDTO";
import { userMapper } from "../mappers/UserMapper";

export class RegisterCustomerUseCase implements IRegisterCustomerUseCase {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly userIdGenerator: IGenerateUserID,
    private readonly tokenService: ITokenService
  ) {}

  async execute(
    userData: UserRequestDTO
  ): Promise<{ user: UserResponseDTO; accessToken: string; refreshToken: string }> {
    const existingUser = await this.customerRepository.findByEmail(userData.email_address);
    if (existingUser) {
      throw new Error("User already exists");
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
      profilePictureUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date(0),
    });

    const userResponse = userMapper.toResponseDTO(newCustomer);

    const accessToken = this.tokenService.generateAccessToken({
      id: userResponse.user_id,
      email: userResponse.email_address,
      role: userResponse.user_role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: userResponse.user_id,
      email: userResponse.email_address,
      role: userResponse.user_role,
    });

    return { user: userResponse, accessToken, refreshToken };
  }
}
