import { LoginUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export interface ILoginCustomerUseCase {
  execute(data: LoginUserDTO): Promise<{
    user: UserResponseDTO;
    accessToken: string;
    refreshToken: string;
  }>;
}
