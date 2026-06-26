export interface WalletResponseDTO {
    walletId: string;
    userId: string;
    balance: number;
    currency: "INR";
    createdAt: Date;
    updatedAt: Date;
}