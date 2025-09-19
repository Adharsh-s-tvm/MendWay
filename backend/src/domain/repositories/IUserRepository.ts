import { CustomerEntity } from "../entities/Customer.js";

export interface ICustomerRepository {

    create(customer: CustomerEntity): Promise<CustomerEntity>;
    findByEmail(email: string): Promise<CustomerEntity | null>
}