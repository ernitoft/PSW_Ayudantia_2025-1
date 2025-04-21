import { ApiBackend } from "@/data/axios";
import { Post, ResponsePosts } from "@/interfaces/Posts"
import React, { useEffect, useState } from "react";


type PostContextProps = {
    posts: Post[] | null;
    loading: boolean;
    getPosts (page: number, pageSize: number): Promise<void>;
    createPost: (post: Post) => void;
    updatePost (post: Post): Promise<void>;
    deletePost (postId: number): Promise<void>;
}

export const PostContext = React.createContext({} as PostContextProps);

export const PostProvider = ({children}: {children: React.ReactNode}) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        if (!posts){ 
            getPosts(1, 10);
        }
    });

    const getPosts = async (page: number, pageSize: number) => {
        try{
            setLoading(true);
            const { data } = await ApiBackend.get<ResponsePosts>(`Post/GetAllPosts?page=${page}&pageSize=${pageSize}`);
            if (data.posts){
                setPosts(data.posts);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los posts: ", error);
            setLoading(false);
            if (error instanceof Error) {
                console.error("Error: ", error.message);
            } else {
                console.error("Error: ", error);
            }
        }
    }

    const createPost = async (post: Post) => {
        // try {
        //     const { data } = await ApiBackend.post<Post>("Post/CreatePost", post);
        //     setPosts((prevPosts) => [...(prevPosts || []), data]);
        // } catch (error) {
        //     console.error("Error al crear el post: ", error);
        // }
    }

    const updatePost = async (post: Post) => {
        // try {
        //     const { data } = await ApiBackend.put<Post>(`Post/UpdatePost/${post.postId}`, post);
        //     setPosts((prevPosts) => prevPosts?.map(p => p.postId === data.postId ? data : p) || []);
        // } catch (error) {
        //     console.error("Error al actualizar el post: ", error);
        // }
    }

    const deletePost = async (postId: number) => {
        // try {
        //     await ApiBackend.delete(`Post/DeletePost/${postId}`);
        //     setPosts((prevPosts) => prevPosts?.filter(p => p.postId !== postId) || []);
        // } catch (error) {
        //     console.error("Error al eliminar el post: ", error);
        // }
    }

    return (
        <PostContext.Provider value={{
            posts,
            loading,
            getPosts,
            createPost,
            updatePost,
            deletePost
        }}>
            {children}
        </PostContext.Provider>
    )
}