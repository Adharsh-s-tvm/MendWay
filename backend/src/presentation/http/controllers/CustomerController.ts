import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../application/use-cases/CreateCustomerUseCase.js";
import { GetCustomerByEmailUseCase } from "../../../application/use-cases/GetCustomerByEmailUseCase.js";

export class CustomerController {
  constructor(
    private createCustomer: CreateCustomerUseCase,
    private getCustomer: GetCustomerByEmailUseCase
  ) {}

  // POST /customers
  create = async (req: Request, res: Response) => {
    try {
      const customer = await this.createCustomer.execute(req.body);
      res.status(201).json(customer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create customer" });
    }
  };

  // GET /customers/:email
  getByEmail = async (req: Request, res: Response) => {
    try {
      const customer = await this.getCustomer.execute(req.params.email!);
      if (!customer) return res.status(404).json({ message: "Not found" });
      res.json(customer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching customer" });
    }
  };
}