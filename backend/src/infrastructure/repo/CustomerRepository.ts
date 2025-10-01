import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";
import { CustomerModel } from "../database/models/CustomerModel";

export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly customerModel = CustomerModel) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerModel.findOne({ email }).lean();
  }

  async create(customer: Customer): Promise<Customer> {
    const created = await this.customerModel.create(customer);
    return created.toObject();
  }
}
