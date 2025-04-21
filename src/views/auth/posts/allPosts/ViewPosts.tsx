'use client';

import { PostCard } from "@/components/_shared/PostCard";
import { PostContext } from "@/context/posts/PostsContext";
import { useContext, useEffect } from "react";

export const ViewPosts = () => {
    const { posts, loading, getPosts} = useContext(PostContext);

    useEffect(() => {
        const fetchPosts = async () => {
            await getPosts(1,10);
        }
        fetchPosts();
    }, []);
    
    return (
        <div className="flex min-h-screen flex-col items-center p-10 bg-black text-white">
            <h1 className="text-4xl font-bold mb-10"> Posts</h1>
            {
                loading ? (
                    <p className="text-lg text-neutral-400"> Cargando posts...</p>
                ) : posts && posts.length > 0 ? (
                    <div className="flex flex-col gap-8 w-full max-w-xl">
                        {
                            posts.map((post) => (
                                <PostCard key={post.postId} post={post} />
                            ))
                        }
                    </div>
                ) : (
                    <p className="text-lg text-neutral-400"> No hay posts disponibles</p>
                )
            }

        </div>
    )
}