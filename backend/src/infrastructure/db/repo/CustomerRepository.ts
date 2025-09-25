import { ICustomerRepository } from "../../../domain/repositories/IUserRepository.js";
import { CustomerEntity } from "../../../domain/entities/Customer.js";
import { CustomerModel } from "../models/CustomerModel.js";

export class CustomerRepository implements ICustomerRepository {
    async create(customer : CustomerEntity) : Promise <CustomerEntity> {
        await CustomerModel.create({...customer});
        return customer;
    }

    async findByEmail(email: string): Promise<CustomerEntity | null> {
        const doc = await CustomerModel.findOne({email}).lean();
        return doc ? new CustomerEntity(doc as any ): null;
    }
}