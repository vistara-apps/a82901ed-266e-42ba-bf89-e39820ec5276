'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { UserAvatar } from './UserAvatar';
import { TipButton } from './TipButton';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { PostCardProps } from '../types';

export function PostCard({ post, variant, onTip }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [tipStatus, setTipStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleTip = async () => {
    if (tipStatus === 'loading') return;
    
    setTipStatus('loading');
    
    try {
      // Simulate tip transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTipStatus('success');
      onTip?.(post.postId);
      
      setTimeout(() => {
        setTipStatus('idle');
      }, 3000);
    } catch (error) {
      setTipStatus('idle');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardContent className="p-4">
        {/* User Header */}
        <div className="flex items-center gap-3 mb-3">
          <UserAvatar 
            address={post.author?.walletAddress}
            name={`User ${post.fid}`}
          />
          <div className="flex-1">
            <div className="font-medium text-sm">@user{post.fid}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-base leading-relaxed">{post.content}</p>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              127
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              23
            </span>
            <span className="flex items-center gap-1">
              <Repeat2 className="w-4 h-4" />
              8
            </span>
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "rounded-full px-3 py-2 transition-all duration-150",
              isLiked && "text-red-500"
            )}
          >
            <Heart 
              className={cn(
                "w-4 h-4 mr-1",
                isLiked && "fill-current"
              )} 
            />
            Like
          </Button>
          
          <Button variant="ghost" size="sm" className="rounded-full px-3 py-2">
            <MessageCircle className="w-4 h-4 mr-1" />
            Reply
          </Button>
          
          <Button variant="ghost" size="sm" className="rounded-full px-3 py-2">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>

        {variant === 'withTipButton' && post.isTippable && (
          <TipButton
            variant={tipStatus === 'loading' ? 'loading' : 'default'}
            onClick={handleTip}
            amount="0.001"
          />
        )}
      </CardFooter>
    </Card>
  );
}
