import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository.js";
import { Customer } from "../../../domain/entities/Customer.js";
import { CustomerModel } from "../models/CustomerModel.js";

export class CustomerRepository implements ICustomerRepository {
    async create(customer : Customer) : Promise <Customer> {
        await CustomerModel.create({...customer});
        return customer;
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const doc = await CustomerModel.findOne({email}).lean();
        return doc ? new CustomerModel(doc as any ): null;
    }
}