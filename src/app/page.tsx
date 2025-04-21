'use client';

import { AuthContext } from "@/context/auth/AuthContext";
import { ViewPosts } from "@/views/auth/posts/allPosts/ViewPosts";
import { LoginPage } from "@/views/nonAuth/LoginPage";
import { useContext } from "react";

export default function Home() {

    const {user} = useContext(AuthContext);

    if (user) {
        return <ViewPosts/>
    }

    return <LoginPage/>
}