import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IGetAllClientsUseCase {
    execute(): Promise<UserResponseDTO[]>;
}