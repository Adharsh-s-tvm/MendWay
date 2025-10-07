import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./infrastructure/database/connection";
import { CustomerRepository } from "./infrastructure/repo/CustomerRepository";
import { BcryptPasswordHasher } from "./infrastructure/utils/BcryptPasswordHasher";
import { UUIDGenerator } from "./infrastructure/utils/UUIDGenerator";
import { CustomerModel } from "./infrastructure/database/models/CustomerModel";
import { RegisterCustomerUseCase } from "./application/use-cases/RegisterCustomerUseCase";
import { LoginCustomerUseCase } from "./application/use-cases/LoginCustomerUseCase";
import { CustomerController } from "./presentation/controllers/CustomerController";
import { createCustomerRoutes } from "./presentation/routes/authRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandler";

dotenv.config();

async function bootstrap() {
  const app = express();


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));



  // Connect to MongoDB
  await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/clean-arch");

  // Infrastructure
  const repo = new CustomerRepository(CustomerModel);
  const passwordHasher = new BcryptPasswordHasher();
  const idGenerator = new UUIDGenerator();

  // Application
  const registerUseCase = new RegisterCustomerUseCase(repo, passwordHasher, idGenerator);
  const loginUseCase = new LoginCustomerUseCase(repo, passwordHasher);

  // Presentation
  const customerController = new CustomerController(registerUseCase, loginUseCase);

  //cors
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));


  // Routes
  app.use("/api/customers", createCustomerRoutes(customerController));

  //Error Handler
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

bootstrap();
