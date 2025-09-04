'use client';

import { useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity } from '@coinbase/onchainkit/identity';
import { Button } from './ui/button';
import { Menu, X, Settings, Activity, Archive } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#', icon: Activity },
    { name: 'Posts', href: '#', icon: Archive },
    { name: 'Activity', href: '#', icon: Activity },
    { name: 'Analytics', href: '#', icon: Settings },
  ];

  return (
    <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">LikeTribute</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ConnectWallet className="!bg-white !text-black hover:!bg-white/90" />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
