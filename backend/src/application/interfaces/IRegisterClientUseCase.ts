import { UserRequestDTO, UserResponseDTO } from "../dtos/UserDTO";

/**
 * Defines the contract for the client registration use case.
 * It specifies the input and the expected output without detailing the implementation.
 */
export interface IRegisterClientUseCase {
    execute(userData: UserRequestDTO): Promise<{
        user: UserResponseDTO;
        accessToken: string;
        refreshToken: string;
    }>;
}