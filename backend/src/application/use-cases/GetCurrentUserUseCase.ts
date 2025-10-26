import { IClientRepository } from "../../domain/repositories/ICustomerRepository";
import { UserResponseDTO } from "../dtos/UserDTO";
import { IGetCurrentUserUseCase } from "../interfaces/IGetCurrentUserUseCase";
import { UserMapper } from "../mappers/UserMapper";

export class GetCurrentUserUseCase implements IGetCurrentUserUseCase {
    constructor(private readonly _clientRepository: IClientRepository) { }

    async execute(userId: string): Promise<UserResponseDTO> {
        const user = await this._clientRepository.findById(userId);
        if (!user) throw new Error("User not found");
        return UserMapper.toResponseDTO(user);
    }
}