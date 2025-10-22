import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { UserResponseDTO } from "../dtos/UserDTO";
import { IGetCurrentUserUseCase } from "../interfaces/IGetCurrentUserUseCase";
import { UserMapper } from "../mappers/UserMapper";

export class GetCurrentUserUseCase implements IGetCurrentUserUseCase {
    constructor(private readonly _customerRepository: ICustomerRepository) {}

    async execute (userId: string): Promise <UserResponseDTO> {
        const user = await this._customerRepository.findById(userId);
        if(!user) throw new Error("User not found");
        return UserMapper.toResponseDTO(user);
    }
}