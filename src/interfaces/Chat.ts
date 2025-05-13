import { Message } from "./Message";

export interface Chat {
    chatId: number;
    repliedNickname: string;
    repliedProfilePicture: string;
    messages: Message[];
}