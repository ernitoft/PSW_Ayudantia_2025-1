'use client';

import { ChatContext } from "@/context/chats/ChatsContext";
import { useSignalR } from "@/hooks/useSignalR";
import { Chat } from "@/interfaces/Chat";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageCircle } from 'lucide-react';

export const HomeMessagePage = () => {
    const { createOrGetChat, sendMessage } = useContext(ChatContext);
    const [chat, setChat] = useState<Chat | null>(null);
    const [currentChatId, setCurrentChatId] = useState<number>(5);
    const [newMessageText, setNewMessageText] = useState<string>('');
    const [errorText, setErrorText] = useState<string | null>('');
    const messageEndRed = useRef<HTMLDivElement>(null);
    const { lastMessage, newChat, newMessage, joinChat } = useSignalR();

    const fetchChat = async (chatId: number) => {
        try {
            await joinChat(chatId.toString());
            const chat = await createOrGetChat(chatId);
            setChat(chat);
        } catch (error) {
            console.error("Error al obtener el chat: ", error);
        }
    }

    useEffect(() => {
        fetchChat(currentChatId);
    }, [currentChatId]);

    const scrollToBottom = () => {
        messageEndRed.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (!chat || !lastMessage) return;
        if (lastMessage.chatId?.toString() === chat.chatId.toString()) {
            setChat(prev => prev ? { ...prev, messages: [...prev.messages, lastMessage] } : prev);
            scrollToBottom();
        }
    }, [lastMessage]);

    useEffect(() => {
        if (!chat || !newMessage) return;
        if (newMessage.chatId?.toString() === chat.chatId.toString()) {
            setChat(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : prev);
            scrollToBottom();
        }
    }, [newMessage]);

    useEffect(() => {
        if (newChat) console.log("Nuevo chat: ", newChat);
    }, [newChat]);


    const toggleChat = () => {
        setChat(null);
        setCurrentChatId(prev => prev === 5 ? 8 : 5);
    }

    const handleSendMessage = async () => {
        if (!newMessageText.trim() || !chat) {
            setErrorText("El mensaje no puede estar vacío");
        }
        try{
            await joinChat(chat?.chatId.toString() || '');
            await sendMessage(newMessageText, chat?.chatId.toString() || '');
            setNewMessageText('');
            setErrorText(null);
            scrollToBottom();
        } catch (error: any) {
            const apiError = error.toString();
            setErrorText(apiError);
        }
    }


    if (!chat) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-32 h-32 rounded-full border-4 border-white mb-6">
                        <MessageCircle height={50} width={50} />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2"> Tus mensajes</h1>
                    <p className="text-neutral-400 mb-6 text-center"> Cargando chat {currentChatId}...</p>
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                        onClick={toggleChat}
                    >
                        Cambiar chat {currentChatId === 5 ? 8 : 5}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-black text-white p-4">
            <div className="flex flex-col items-center w-full max-w-md mx-auto flex-grow overflow-y-auto">
                <div className="flex flex-col items-center mb-6">
                    {chat.repliedProfilePicture ? (
                        <img src={chat.repliedProfilePicture} alt="Foto perfil"
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                            <MessageCircle size={50} />
                        </div>
                    )}
                    <h1 className="text-neutral-400 mb-2 text-center"> {chat.repliedNickname || 'Usuario sin nombre'}</h1>
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                        onClick={toggleChat}>
                        Cambiar chat {currentChatId === 5 ? 8 : 5}
                    </button>
                </div>

                <div className="flex flex-col w-full space-y-4 mb-4">
                    {chat.messages?.length > 0 ? (
                        chat.messages.map((message, index) => (
                            <div key={index} className="bg-white text-black p-4 rounded-lg shadow">
                                <p className="font-semibold text-sm text-gray-700 mb-1"> {message.repliedNickname || 'Usuario'} </p>
                                <p>{message.content}</p>
                                <span className="text-xs text-gray-500">
                                    {message.sentAt ? new Date(message.sentAt).toLocaleString() : 'Sin fecha'}
                                </span>
                            </div>
                        ))
                    ): (
                        <p className="text-neutral-400"> No hay mensajes en este chat</p>
                    )}
                    <div ref={messageEndRed}/>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-black border-t border-gray-700">
                <div className="flex items-center justify-between gap-2">
                    <input type="text"
                        value={newMessageText}
                        onChange={(e)=> setNewMessageText(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow rounded-full bg-gray-800 text-white px-4 py-2 focus:outline-none"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full"
                        onClick={handleSendMessage}
                    >
                        Enviar 
                    </button>
                </div>
                {errorText && (
                    <p className="text-red-500 text-sm text-center"> {errorText}</p>
                )}
            </div>
        </div>
    );
}