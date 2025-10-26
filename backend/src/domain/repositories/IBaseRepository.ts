import { Client } from "../entities/Client";

export interface IBaseRepository {
    findByEmail(email: string): Promise<Client | null>;
    findById(id: string): Promise<Client | null>;
    create(user: Client): Promise<Client>;
}