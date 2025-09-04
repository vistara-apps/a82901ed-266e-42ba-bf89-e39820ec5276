'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '../lib/utils';

interface UserAvatarProps {
  address?: string;
  name?: string;
  image?: string;
  variant?: 'default';
  className?: string;
}

export function UserAvatar({ 
  address, 
  name, 
  image, 
  variant = 'default',
  className 
}: UserAvatarProps) {
  const getInitials = () => {
    if (name) {
      return name.slice(0, 2).toUpperCase();
    }
    if (address) {
      return address.slice(2, 4).toUpperCase();
    }
    return '??';
  };

  const getGradientFromAddress = (addr: string) => {
    if (!addr) return 'from-blue-400 to-purple-400';
    
    const hash = addr.slice(2, 8);
    const hue1 = parseInt(hash.slice(0, 2), 16) % 360;
    const hue2 = parseInt(hash.slice(2, 4), 16) % 360;
    
    return `from-[hsl(${hue1},70%,60%)] to-[hsl(${hue2},70%,60%)]`;
  };

  return (
    <Avatar className={cn("ring-2 ring-white/20", className)}>
      {image ? (
        <AvatarImage src={image} alt={name || address} />
      ) : (
        <AvatarFallback 
          className={cn(
            "bg-gradient-to-br text-white font-semibold text-xs",
            getGradientFromAddress(address || '')
          )}
        >
          {getInitials()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
