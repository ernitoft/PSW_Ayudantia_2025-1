'use client';

import { ApiBackend } from "@/data/axios";
import { useSignalR } from "@/hooks/useSignalR";
import { Chat } from "@/interfaces/Chat";
import { createContext, useState } from "react";

type ChatContextProps = {
    chats: Chat[] | null,
    lastMessage: any | null,
    getChatsByUserId: (userId: string) => Promise<void>,
    getMessagesByChat: (chatId: string) => Promise<void>,
    getUserChatIds: (userId: string) => Promise<void>,
    createOrGetChat: (id: number) => Promise<Chat>,
    sendMessage: (content: string, chatId: string) => Promise<void>,
    joinChat: (chatId: string) => Promise<void>,
    joinAllChats: (chatIds: string[]) => Promise<void>,
    joinUserGroup: (userId: string) => Promise<void>,
    leaveChat: (chatId: string) => Promise<void>,
    closeChat: (chatId: string) => Promise<void>,
}

export const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [chats, setChats] = useState<Chat[] | null>(null);

    const { lastMessage, joinChat, joinAllChats, joinUserGroup, leaveChat, closeChat } = useSignalR();

    const createOrGetChat = async (id: number) => {
        try {
            const resp = await ApiBackend.post(`/Chat/CreateOrGetChat/${id}`);
            const chat: Chat = resp.data;
            console.log("Chat creado o recuperado: ", chat);
            return chat;
        } catch (error) {
            console.error("Error al crear o recuperar el chat: ", error);
            throw new Error("Error al crear o recuperar el chat");
        }
    }

    const sendMessage = async (content: string, chatId: string) => {
        try {
            if (!content.trim()) {
                throw new Error("El mensaje no puede estar vacío");
            }
            const message = {
                content,
                chatId
            }
            await ApiBackend.post("/Chat/SendMessage", message);
        } catch (error: any) {
            console.error("Error al enviar el mensaje: ", error);
            throw new Error(error.response?.data?.error);
        }
    }

    const getChatsByUserId = async (userId: string) => {
        // Implementación futura
    };

    const getMessagesByChat = async (chatId: string) => {
        // Implementación futura
    };

    const getUserChatIds = async (userId: string) => {
        // Implementación futura
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                lastMessage,
                getChatsByUserId,
                getMessagesByChat,
                getUserChatIds,
                createOrGetChat,
                sendMessage,
                joinChat,
                joinAllChats,
                joinUserGroup,
                leaveChat,
                closeChat
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}