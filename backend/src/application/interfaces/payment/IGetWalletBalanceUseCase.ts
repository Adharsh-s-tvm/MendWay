import { WalletResponseDTO } from "../../dtos/wallet/WalletDTO";

export interface IGetWalletBalanceUseCase {
    execute(userId: string): Promise<WalletResponseDTO>;
}
