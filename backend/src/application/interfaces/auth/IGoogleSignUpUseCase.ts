import { LoginResponseDTO } from "../../dtos/user/UserDTO";

export interface IGoogleSignUpUseCase {
    execute(
        email: string,
        name: string,
        role: string
    ): Promise<LoginResponseDTO>;
}