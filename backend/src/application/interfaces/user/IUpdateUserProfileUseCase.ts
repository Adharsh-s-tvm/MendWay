import { User } from "../../../domain/entities/User";
import { UserResponseDTO } from "../../dtos/user/UserDTO";


export interface IUpdateUserProfileUseCase {
    execute(userId: string, updates: Partial<User>, profilePictureFilePath?: string, mimetype?: string): Promise<UserResponseDTO>;
}
