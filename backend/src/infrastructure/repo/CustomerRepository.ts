import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";
import { CustomerModel } from "../database/models/CustomerModel";

export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly _customerModel = CustomerModel) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this._customerModel.findOne({ email }).lean();
  }

  async create(customer: Customer): Promise<Customer> {
    const created = await this._customerModel.create(customer);
    return created.toObject();
  }
}
