import { Customer } from "../entities/Customer";

export interface IBaseRepository {
    findByEmail (email: string) : Promise<Customer | null>;
    findById(id: string): Promise<Customer | null>;
    create(user: Customer): Promise<Customer>;
}