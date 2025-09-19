import { v4 as uuid } from "uuid"
import { CustomerEntity, UserLoginMethod } from "../../domain/entities/Customer.js";
import { ICustomerRepository } from "../../domain/repositories/IUserRepository.js";
import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO.js";

export class CreateCustomerUseCase {
    constructor(private repo: ICustomerRepository) { }

    async execute(data: CreateCustomerDTO): Promise<CustomerEntity> {
        const customer = new CustomerEntity({
            id: uuid(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            passwordHash: data.passwordHash,
            loginMethod: data.loginMethod === 'googleauthentication'
                ? UserLoginMethod.GoogleAuthentication
                : UserLoginMethod.Email
        })

        return this.repo.create(customer);
    }
}
