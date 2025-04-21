export interface ResponsePosts {
    posts?: Post[];
    totalCount?: number;
}

export interface Post {
    postId?: number;
    authorNickName?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    files?: any[];
    reactions?: any[];
    totalReactions?: number;
}
