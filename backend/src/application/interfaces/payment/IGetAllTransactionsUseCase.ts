import { TransactionResponseDTO } from "../../dtos/wallet/TransactionDTO";

export interface IGetAllTransactionsUseCase {
    execute(
        page: number,
        limit: number
    ): Promise<{
        transactions: TransactionResponseDTO[];
        total: number;
        totalPages: number;
    }>;
}