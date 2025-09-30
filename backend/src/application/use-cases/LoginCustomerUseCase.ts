import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { LoginUserDTO, UserResponseDTO } from "../dtos/UserDTO";
import { userMapper } from "../mappers/UserMapper";
import { IPasswordHasher } from "../services/IPasswordHasher";

export class LoginCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerRepository,
        private readonly passwordHasher: IPasswordHasher,
    ) { }

    async execute(userLoginData: LoginUserDTO): Promise<{ user: UserResponseDTO }> {
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

        return { user: userResponse }
    }
}

