import { Request, Response } from "express";
import { HttpStatusCode } from "../enums/httpCodes";
import { IRegisterCustomerUseCase } from "../../application/interfaces/IRegisterCustomerUseCase";
import { ILoginCustomerUseCase } from "../../application/interfaces/ILoginCustomerUseCase";

export class CustomerController {
    constructor(
        private readonly _registerCustomer: IRegisterCustomerUseCase,
        private readonly _loginCustomer: ILoginCustomerUseCase
    ) { }

    async register(req: Request, res: Response) {
        try {
            const user = await this._registerCustomer.execute(req.body);
        res.status(HttpStatusCode.CREATED).json(user);
        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this._loginCustomer.execute(req.body);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({message: error.message});
        }
    }
}