import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IUpdateUserSkillsUseCase {
    execute(userId: string, skills: string[]): Promise<UserResponseDTO>
}