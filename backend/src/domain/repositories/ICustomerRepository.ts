import { Customer } from "../entities/Customer.js"

export interface ICustomerRepository {

    create(customer: Customer): Promise<Customer>
    findByEmail(email: string): Promise<Customer | null>;
}