import { UserRequestDTO, UserResponseDTO } from "../../application/dtos/UserDTO";

/**
 * Defines the contract for the customer registration use case.
 * It specifies the input and the expected output without detailing the implementation.
 */
export interface IRegisterCustomerUseCase {
    execute(userData: UserRequestDTO): Promise<{
        user: UserResponseDTO;
        accessToken: string;
        refreshToken: string;
    }>;
}