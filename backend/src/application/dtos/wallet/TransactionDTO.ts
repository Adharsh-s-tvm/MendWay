import {
    transactionSource,
    transactionStatus,
    transactionType,
} from "../../../shared/enums/transactionEnums";

export interface TransactionResponseDTO {
    transactionId: string;
    walletId: string;
    userId: string;

    type: transactionType;
    amount: number;

    source: transactionSource;

    serviceId?: string;

    status: transactionStatus;

    createdAt: Date;
}

export interface GetTransactionsRequestDTO {
    page: number;
    limit: number;
}

export interface GetTransactionsResponseDTO {
    transactions: TransactionResponseDTO[];
    total: number;
    totalPages: number;
}