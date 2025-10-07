import { Request, Response } from "express";
import { RegisterCustomerUseCase } from "../../application/use-cases/RegisterCustomerUseCase";
import { LoginCustomerUseCase } from "../../application/use-cases/LoginCustomerUseCase";
import { HttpStatusCode } from "../enums/httpCodes";

export class CustomerController {
    constructor(
        private readonly registerCustomer: RegisterCustomerUseCase,
        private readonly loginCustomer: LoginCustomerUseCase
    ) { }

    async register(req: Request, res: Response) {
        try {
            const user = await this.registerCustomer.execute(req.body);
            console.log('Req body: ', req.body)
            res.status(HttpStatusCode.CREATED).json(user);
        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.loginCustomer.execute(req.body);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: error.message});
        }
    }
}