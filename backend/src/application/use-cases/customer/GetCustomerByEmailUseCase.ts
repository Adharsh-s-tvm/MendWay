import { Customer } from "../../../domain/entities/Customer.js";
import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository.js";

export class GetCustomerByEmailUseCase {
    constructor(private readonly customerRepository: ICustomerRepository) { };

    async execute(email: string): Promise<Customer | null> {
        const existingCustomer = await this.customerRepository.findByEmail(email);
        return existingCustomer
    }


}