export interface Message { 
    chatId : string;
    senderId: number;
    repliedId: number;
    repliedNickname: string;
    content?: string;
    sentAt?: Date;
}