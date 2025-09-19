import { CustomerEntity } from "../../domain/entities/Customer.js";
import { ICustomerRepository } from "../../domain/repositories/IUserRepository.js";


export class GetCustomerByEmailUseCase {
    constructor(private repo: ICustomerRepository) { }

    async execute(email: string): Promise<CustomerEntity | null> {
        return this.repo.findByEmail(email);
    }
}