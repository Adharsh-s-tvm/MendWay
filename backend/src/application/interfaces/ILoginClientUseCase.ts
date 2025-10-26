import { LoginUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export interface ILoginClientUseCase {
  execute(data: LoginUserDTO): Promise<{
    user: UserResponseDTO;
    accessToken: string;
    refreshToken: string;
  }>;
}
