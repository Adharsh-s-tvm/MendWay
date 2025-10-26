import express from 'express';
import { ClientController } from '../controllers/ClientController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = express.Router();

export function createClientRoutes(
    clientController: ClientController,
    authMiddleware: AuthMiddleware
) {
    router.post("/register", (req, res) => clientController.register(req, res));
    router.post("/login", (req, res) => clientController.login(req, res));

    router.get("/me", authMiddleware.handle.bind(authMiddleware), (req, res) =>
        clientController.me(req, res)
    );

    router.post("/refresh", (req, res) => clientController.refresh(req, res));

    router.post("/logout", (req, res) => clientController.logout(req, res));
    return router;
}   