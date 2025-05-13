'use client';

import { AuthProvider } from "@/context/auth/AuthContext";
import { PostProvider } from '../context/posts/PostsContext';
import { ChatProvider } from '../context/chats/ChatsContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>
        <PostProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </PostProvider>
      </AuthProvider>
    );
  } 