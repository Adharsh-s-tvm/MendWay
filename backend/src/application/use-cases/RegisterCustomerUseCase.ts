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
    private readonly _customerRepository: ICustomerRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _userIdGenerator: IGenerateUserID,
    private readonly _tokenService: ITokenService
  ) {}

  async execute(
    userData: UserRequestDTO
  ): Promise<{ user: UserResponseDTO; accessToken: string; refreshToken: string }> {
    const existingUser = await this._customerRepository.findByEmail(userData.email_address);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this._passwordHasher.hash(userData.password);
    const customerId = await this._userIdGenerator.create();

    const newCustomer = await this._customerRepository.create({
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

    const accessToken = this._tokenService.generateAccessToken({
      id: userResponse.user_id,
      email: userResponse.email_address,
      role: userResponse.user_role,
    });

    const refreshToken = this._tokenService.generateRefreshToken({
      id: userResponse.user_id,
      email: userResponse.email_address,
      role: userResponse.user_role,
    });

    return { user: userResponse, accessToken, refreshToken };
  }
}
