'use client';

import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const useSignalR = (accessToken?: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [lastMessage, setLastMessage] = useState<any | null>(null);
    const [newMessage, setNewMessage] = useState<any | null>(null);
    const [newChat, setNewChat] = useState<any | null>(null);

    useEffect(() => {
        if (!websocketUrl) {
            console.error("WebSocket URL no definida");
            return;
        }

        const connect = new signalR.HubConnectionBuilder()
            .withUrl(websocketUrl, {
                accessTokenFactory: () => accessToken || "",
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        setConnection(connect);

        return () => {
            connect.stop()
        };
    }, [accessToken]);

    useEffect(() => {
        if (!connection) return;

        connection.start()
        .then(() => {
            console.log("Conectado a SignalR | NotificationHub");
        }).catch(error => {
            console.error("Error al conectar a SignalR | NotificationHub: ", error);
        });

        connection.onreconnecting((error) => {
            console.warn("Reconectando a SignalR | NotificationHub: ", error);
        });

        connection.onreconnected((connectionId) => {
            console.log("Reconectado a SignalR | NotificationHub: ", connectionId);
        });

        connection.onclose((error) => {
            console.warn("Conexión cerrada a SignalR | NotificationHub: ", error);
        });

        //Eventos del Backend
        connection.on('ReceiveMessage', (message:any) => {
            console.log("Mensaje Recibido: ", message);
            setMessages(prevMessages => [...prevMessages, message]);
            setLastMessage(message);
        });

        connection.on('NewMessage', (messages:any) => {
            console.log("Nuevo Mensaje: ", messages);
            setNewMessage(messages);
        });

        connection.on('NewChatCreated', (chat:any) => {
            console.log("Nuevo Chat Creado: ", chat);
            setNewChat(chat);
        });

        return () => {
            connection.off('ReceiveMessage');
            connection.off('NewMessage');
            connection.off('NewChatCreated');
            connection.stop();
        }

    }, [connection]);

    const joinChat = async (chatId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try{
                console.log("Unido al chat: ", chatId);
                await connection.invoke('JoinChat', chatId);
            } catch (error) {
                console.error("Error al unirse al chat: ",chatId, " ", error);
            }
        } else { 
            console.warn("No se puede unir al chat, conexión no establecida");
        }
    }

    const joinAllChats = async (chatIds: string[]) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try{
                console.log("Unido a todos los chats: ", chatIds);
                await connection.invoke('JoinAllChats', chatIds);
            } catch (error) {
                console.error("Error al unirse a todos los chats: ",chatIds, " ", error);
            }
        } else { 
            console.warn("No se puede unir a todos los chats, conexión no establecida");
        }
    }

    const joinUserGroup = async (userId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try{
                console.log("Unido al grupo de usuario: ", userId);
                await connection.invoke('JoinUserGroup', userId);
            } catch (error) {
                console.error("Error al unirse al grupo de usuario: ",userId, " ", error);
            }
        } else { 
            console.warn("No se puede unir al grupo de usuario, conexión no establecida");
        }
    }

    const leaveChat = async (chatId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try{
                console.log("Salió del chat: ", chatId);
                await connection.invoke('LeaveChat', chatId);
            } catch (error) {
                console.error("Error al salir del chat: ",chatId, " ", error);
            }
        } else { 
            console.warn("No se puede salir del chat, conexión no establecida");
        }
    }

    const closeChat = async (chatId: string) => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try{
                console.log("Cerrando el chat: ", chatId);
                await connection.invoke('CloseChat', chatId);
            } catch (error) {
                console.error("Error al cerrar el chat: ",chatId, " ", error);
            }
        } else { 
            console.warn("No se puede cerrar el chat, conexión no establecida");
        }
    }

    return {
        messages,
        lastMessage,
        newMessage,
        newChat,
        joinChat,
        joinAllChats,
        joinUserGroup,
        leaveChat,
        closeChat,
    }
}
