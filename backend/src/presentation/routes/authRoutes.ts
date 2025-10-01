import express from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = express.Router();

export function createCustomerRoutes(controller: CustomerController) {
    router.post("/register", (req, res) => controller.register(req, res));
    router.post("/login", (req, res)=> controller.login(req, res));
    return router;
}