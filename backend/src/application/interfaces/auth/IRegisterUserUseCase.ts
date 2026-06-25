import { UserRequestDTO, UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IRegisterUserUseCase {
    execute(userData: UserRequestDTO): Promise<{
        user: UserResponseDTO;
        accessToken: string;
        refreshToken: string;
    }>;
}