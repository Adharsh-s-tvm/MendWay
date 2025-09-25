import { ICustomerRepository } from "../../../domain/repositories/ICustomerRepository.js";
import { IGenerateUserID } from "../../services/IGenerateUserId.js";
import { IPasswordHasher } from "../../services/IPasswordHasher.js";
import { CreateCustomerRequestDTO, CreateCustomerResponseDTO } from "../../dtos/CreateCustomerDTO.js";
import { CustomerMapper } from "../../mappers/CustomerMapper.js";

export class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: ICustomerRepository,
        private readonly userIdGenerator: IGenerateUserID,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async execute(request: CreateCustomerRequestDTO): Promise<CreateCustomerResponseDTO> {
        // 1. Check if email already exists
        const existingCustomer = await this.customerRepository.findByEmail(request.email);
        if (existingCustomer) {
            throw new Error("Customer with this email already exists")
        }

        // 2. Generate ID
        const id = await this.userIdGenerator.create();

        // 3. Hash password
        const passwordHash = await this.passwordHasher.hash(request.password);

        // 4. Build Customer entity
        const now = new Date();

        const customer = CustomerMapper.toEntity(request, id, passwordHash, now);

        const createdCustomer = await this.customerRepository.create(customer);

        return CustomerMapper.toCreateResponse(createdCustomer);
    }
}