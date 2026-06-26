import { TransactionResponseDTO } from "../../dtos/wallet/TransactionDTO";

export interface IGetWorkerTransactionsUseCase {
    execute(
        workerId: string,
        page: number,
        limit: number
    ): Promise<{
        transactions: TransactionResponseDTO[];
        total: number;
        totalPages: number;
    }>;
}