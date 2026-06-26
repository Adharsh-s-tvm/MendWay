import { TransactionResponseDTO } from "../../dtos/wallet/TransactionDTO";

export interface IGetClientTransactionsUseCase {
    execute(
        userId: string,
        page: number,
        limit: number
    ): Promise<{
        transactions: TransactionResponseDTO[];
        total: number;
        totalPages: number;
    }>;
}