// src/application/mappers/CustomerMapper.ts

import { Customer } from "../../domain/entities/Customer.js";
import { CreateCustomerRequestDTO, CreateCustomerResponseDTO } from "../dtos/CreateCustomerDTO.js";
import { UserRole } from "../../domain/enums.js";

export class CustomerMapper {
    static toEntity(
        dto: CreateCustomerRequestDTO,
        id: string,
        passwordHash: string,
        now: Date
    ): Customer {
        return {
            id,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            passwordHash: passwordHash,
            isBlocked: false,
            role: UserRole.CUSTOMER,
            loginMethod: dto.loginMethod,
            lastLogin: now,
            createdAt: now,
            updatedAt: now,
        };
    }

    static toCreateResponse(customer: Customer): CreateCustomerResponseDTO {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            role: customer.role,
            loginMethod: customer.loginMethod,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        };
    }

    static toPublicProfile(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
        };
    }

    static toAdminView(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            isBlocked: customer.isBlocked,
            lastLogin: customer.lastLogin,
        };
    }
}
