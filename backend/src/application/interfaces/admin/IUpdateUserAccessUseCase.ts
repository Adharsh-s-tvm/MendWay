import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IUpdateUserAccessUseCase {
    execute(userId: string): Promise<UserResponseDTO>;
}
