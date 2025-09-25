import { Router } from "express";
import { CustomerRepository } from "../../infrastructure/db/repo/CustomerRepository.js";
import { CreateCustomerUseCase } from "../../application/use-cases/CreateCustomerUseCase.js";
import { GetCustomerByEmailUseCase } from "../../application/use-cases/GetCustomerByEmailUseCase.js";
import { CustomerController } from "../controllers/CustomerController.js";

const repo = new CustomerRepository();

const controller = new CustomerController(
    new CreateCustomerUseCase(repo),
    new GetCustomerByEmailUseCase(repo)
);

const router = Router();

router.post("/", controller.create);
router.get("/:email", controller.getByEmail);

export default router;