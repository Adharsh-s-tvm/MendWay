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
import { errorHandler } from "./presentation/middlewares/ErrorHandler";
import { JwtTokenService } from "./infrastructure/utils/JwtTokenService";
import { IRegisterCustomerUseCase } from "./application/interfaces/IRegisterCustomerUseCase";
import { GetCurrentUserUseCase } from "./application/use-cases/GetCurrentUserUseCase";
import { AuthMiddleware } from "./presentation/middlewares/AuthMiddleware";
import cookieParser from "cookie-parser";

dotenv.config();

async function bootstrap() {
  const app = express();


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


  // Connect to MongoDB
  await connectDB(process.env.MONGO_URI ?? "mongodb://localhost:27017/MEND-WAY");

  // Infrastructure
  const repo = new CustomerRepository(CustomerModel);
  const passwordHasher = new BcryptPasswordHasher();
  const idGenerator = new UUIDGenerator();

  //jwt
  const tokenService = new JwtTokenService(
    process.env.ACCESS_TOKEN_SECRET ?? "default-access-secret",
    process.env.REFRESH_TOKEN_SECRET ?? "default-refresh-secret",
  );


  // Application
  const registerUseCase: IRegisterCustomerUseCase = new RegisterCustomerUseCase(repo, passwordHasher, idGenerator, tokenService);
  const loginUseCase = new LoginCustomerUseCase(repo, passwordHasher, tokenService);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(repo);

  // Presentation
  const customerController = new CustomerController(registerUseCase, loginUseCase, getCurrentUserUseCase, tokenService);

  //cors
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

  const authMiddleware = new AuthMiddleware(tokenService)

  // Routes
  app.use("/api/customers", createCustomerRoutes(customerController, authMiddleware));

  //Error Handler
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    return console.log(`Server running on http://localhost:${PORT}`)
  });
}

bootstrap();
