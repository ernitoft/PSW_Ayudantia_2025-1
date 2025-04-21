'use client';

import { Post } from '@/interfaces/Posts';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';

type InstaPostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: InstaPostCardProps) => {
  const formattedTime = moment(post.createdAt).fromNow();
  const imageUrl = post.files?.[0]?.urlFile || '/placeholder.jpg';

  return (
    <div className="max-w-md w-full mx-auto border border-neutral-800 rounded-lg overflow-hidden bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold">
            {post.authorNickName?.[0]}
          </div>
          <div>
            <span className="font-semibold text-sm">{post.authorNickName}</span>
            <p className="text-xs text-neutral-400">{formattedTime}</p>
          </div>
        </div>
        <button className="text-xl font-bold">⋯</button>
      </div>

      {/* Image */}
      <div className="w-full h-[420px] bg-neutral-900 relative">
      <Image
        src={imageUrl}
        alt="Post image"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 420px"
      />
      {post.content && (
          <div className="absolute bottom-0 bg-black/60 w-full text-center text-white text-sm font-semibold py-2">
            {post.content}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex space-x-4">
          <Heart className="w-5 h-5 cursor-pointer" />
          <MessageCircle className="w-5 h-5 cursor-pointer" />
          <Send className="w-5 h-5 cursor-pointer" />
        </div>
        <Bookmark className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Likes */}
      <div className="px-4 text-sm font-semibold">
        {post.totalReactions || 0} Me gusta
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-4 pb-4 pt-1 text-sm">
          <span className="font-semibold mr-2">{post.authorNickName}</span>
          {post.content}
        </div>
      )}
    </div>
  );
};
