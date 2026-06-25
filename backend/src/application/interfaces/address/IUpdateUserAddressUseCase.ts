import { AddAddressDTO } from "../../dtos/address/AddressDTO";
import { UserResponseDTO } from "../../dtos/user/UserDTO";

export interface IAddUserAddressUseCase {
    execute(
        userId: string,
        data: AddAddressDTO
    ): Promise<UserResponseDTO>;
}