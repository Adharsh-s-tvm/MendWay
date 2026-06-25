import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IGetAllWorkersUseCase {
    execute(): Promise<UserResponseDTO[]>;
}