import { VerificationStatus } from "../../../shared/enums/authEnums";
import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IUpdateVerificationStatusUseCase {
    execute(userId: string, status: VerificationStatus, reason?: string): Promise<UserResponseDTO>;
}
