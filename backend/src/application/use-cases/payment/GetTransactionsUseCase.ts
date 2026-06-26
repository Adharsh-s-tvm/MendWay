import { IGetTransactionsUseCase } from "../../interfaces/payment/IGetTransactionsUseCase";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { TransactionResponseDTO } from "../../dtos/wallet/TransactionDTO";

export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  constructor(
    private readonly _transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string, page = 1, limit = 10): Promise<{
    transactions: TransactionResponseDTO[];
    total: number;
    totalPages: number;
  }> {
    return this._transactionRepository.findByUserId(userId, page, limit);
  }
}