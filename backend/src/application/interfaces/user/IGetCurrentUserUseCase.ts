import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IGetCurrentUserUseCase {
    execute(email: string): Promise<UserResponseDTO | null>;
}

