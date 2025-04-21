'use client';

import { AuthProvider } from "@/context/auth/AuthContext";
import { PostProvider } from '../context/posts/PostsContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>
        <PostProvider>
          {children}
        </PostProvider>
      </AuthProvider>
    );
  } 