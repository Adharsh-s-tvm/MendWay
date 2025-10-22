import { UserResponseDTO } from "../dtos/UserDTO";

export interface IGetCurrentUserUseCase {
  execute(userId: string): Promise<UserResponseDTO>;
}

