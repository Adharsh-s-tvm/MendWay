import express from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = express.Router();

export function createCustomerRoutes(
    customerController: CustomerController,
    authMiddleware: AuthMiddleware
) {
    router.post("/register", (req, res) => customerController.register(req, res));
    router.post("/login", (req, res) => customerController.login(req, res));

    router.get("/me", authMiddleware.handle.bind(authMiddleware), (req, res) =>
        customerController.me(req, res)
    );
    return router;
}   