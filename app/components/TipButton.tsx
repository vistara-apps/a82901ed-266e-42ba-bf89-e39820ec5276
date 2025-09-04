'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Heart, Loader2, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { TipButtonProps } from '../types';

export function TipButton({ 
  variant = 'default', 
  onClick, 
  amount = '0.001', 
  className 
}: TipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick && variant !== 'disabled') {
      onClick();
    }
  };

  const getButtonContent = () => {
    switch (variant) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Tipping...
          </>
        );
      case 'disabled':
        return (
          <>
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Tip
          </>
        );
      default:
        return (
          <>
            <Heart 
              className={cn(
                "w-4 h-4 mr-2 transition-all duration-150",
                isHovered && "fill-current scale-110"
              )} 
            />
            Tip
            <Send className="w-3 h-3 ml-2 opacity-60" />
          </>
        );
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={variant === 'disabled' || variant === 'loading'}
      variant={variant === 'disabled' ? 'secondary' : 'accent'}
      size="sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "rounded-full px-6 py-2 font-medium transition-all duration-250 ease-out",
        "hover:scale-105 hover:shadow-lg",
        variant === 'loading' && "cursor-not-allowed",
        variant === 'disabled' && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {getButtonContent()}
    </Button>
  );
}
