import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { LoginUserDTO, UserResponseDTO } from "../dtos/UserDTO";
import { ILoginCustomerUseCase } from "../interfaces/ILoginCustomerUseCase";
import { userMapper } from "../mappers/UserMapper";
import { IPasswordHasher } from "../services/IPasswordHasher";
import { ITokenService } from "../services/ITokenService";

export class LoginCustomerUseCase implements ILoginCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenService: ITokenService
    ) { }

    async execute(userLoginData: LoginUserDTO): Promise<{
        user: UserResponseDTO; accessToken: string; refreshToken: string;
    }> {
        const { email_address, password } = userLoginData;

        const user = await this.customerRepository.findByEmail(email_address);

        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (user.isBlocked) {
            throw new Error("Your account is blocked");
        }

        if (!user.passwordhash) {
            throw new Error("User credentials are not set");
        }

        const isValidPassword = await this.passwordHasher.compare(password, user.passwordhash);

        if (!isValidPassword) throw new Error("Invalid email or password");

        const userResponse = userMapper.toResponseDTO(user);

        const accessToken = this.tokenService.generateAccessToken({id: user.customerId, email : user.email, role :user.role });
        const refreshToken = this.tokenService.generateRefreshToken({ id: user.customerId, email : user.email, role :user.role });

        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken)

        return { user: userResponse,
            accessToken, 
            refreshToken
         }
    }
}

