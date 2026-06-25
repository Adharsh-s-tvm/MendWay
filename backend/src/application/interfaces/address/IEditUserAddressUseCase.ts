import { UpdateAddressDTO } from "../../dtos/address/AddressDTO";

export interface IEditUserAddressUseCase {
  execute(
    userId: string,
    addressId: string,
    data: UpdateAddressDTO
  ): Promise<void>;
}
