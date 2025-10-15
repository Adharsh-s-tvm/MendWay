import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { LoginUserDTO, UserResponseDTO } from "../dtos/UserDTO";
import { ILoginCustomerUseCase } from "../interfaces/ILoginCustomerUseCase";
import { userMapper } from "../mappers/UserMapper";
import { IPasswordHasher } from "../services/IPasswordHasher";
import { ITokenService } from "../services/ITokenService";

export class LoginCustomerUseCase implements ILoginCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository,
        private readonly _passwordHasher: IPasswordHasher,
        private readonly _tokenService: ITokenService
    ) { }

    async execute(userLoginData: LoginUserDTO): Promise<{
        user: UserResponseDTO; accessToken: string; refreshToken: string;
    }> {
        const { email_address, password } = userLoginData;

        const user = await this._customerRepository.findByEmail(email_address);

        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (user.isBlocked) {
            throw new Error("Your account is blocked");
        }

        if (!user.passwordhash) {
            throw new Error("User credentials are not set");
        }

        const isValidPassword = await this._passwordHasher.compare(password, user.passwordhash);

        if (!isValidPassword) throw new Error("Invalid email or password");

        const userResponse = userMapper.toResponseDTO(user);

        const accessToken = this._tokenService.generateAccessToken({id: user.customerId, email : user.email, role :user.role });
        const refreshToken = this._tokenService.generateRefreshToken({ id: user.customerId, email : user.email, role :user.role });

        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken)

        return { user: userResponse,
            accessToken, 
            refreshToken
         }
    }
}

