import { ChatMessageResponseDTO } from "../../dtos/chat/chatDTO";

export interface IGetMessagesUseCase {
    execute(chatId: string): Promise<ChatMessageResponseDTO[]>;
}