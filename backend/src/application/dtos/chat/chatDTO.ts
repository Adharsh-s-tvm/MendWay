export interface SendMessageRequestDTO {
    chatId: string;
    senderId: string;
    receiverId: string;
    message: string;
    attachmentUrl?: string;
    messageType?: "text" | "image" | "file";
}

export interface ChatMessageResponseDTO {
    messageId: string;
    chatId: string;

    senderId: string;
    receiverId: string;

    message: string;
    attachmentUrl?: string;
    messageType?: string;

    isRead: boolean;
    createdAt: Date;
}

export interface GetMessagesResponseDTO {
    messages: ChatMessageResponseDTO[];
}