import { Role } from "../../../shared/enums/authEnums";
import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IChangeUserRoleUseCase {
    execute(userId: string, newRole: Role): Promise<{
        user: UserResponseDTO;
        accessToken: string;
        refreshToken: string;
    }>;
}
