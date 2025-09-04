'use client';

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import { DashboardStats } from './components/DashboardStats';
import { TipButton } from './components/TipButton';
import { TransactionStatusOverlay } from './components/TransactionStatusOverlay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Heart, Zap, Shield, Sparkles } from 'lucide-react';
import { Post, TransactionStatus } from './types';

export default function HomePage() {
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>({
    status: 'idle'
  });
  
  // Mock data
  const samplePosts: Post[] = [
    {
      postId: '1',
      fid: '12345',
      content: 'Just shipped a new feature for our Base miniapp! 🚀 The future of social tipping is here. What do you think about monetizing likes directly on social media?',
      createdAt: new Date().toISOString(),
      isTippable: true,
      author: {
        fid: '12345',
        walletAddress: '0x1234567890123456789012345678901234567890',
        createdAt: new Date().toISOString(),
      }
    },
    {
      postId: '2',
      fid: '67890',
      content: 'GM builders! Working on something exciting with onchain social interactions. The intersection of DeFi and social media is going to be huge! 💜',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isTippable: true,
      author: {
        fid: '67890',
        walletAddress: '0x0987654321098765432109876543210987654321',
        createdAt: new Date().toISOString(),
      }
    }
  ];

  const handleTip = (postId: string) => {
    console.log('Tipping post:', postId);
    setTransactionStatus({
      status: 'pending'
    });

    // Simulate transaction
    setTimeout(() => {
      setTransactionStatus({
        status: 'success',
        hash: '0x1234567890abcdef'
      });
    }, 2000);
  };

  const closeTransactionOverlay = () => {
    setTransactionStatus({ status: 'idle' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Turn your Likes into Liquid Love
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Like<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">Tribute</span>
          </h1>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            The Farcaster miniapp for blockchain-powered post tipping. Tap likes, send love.
          </p>

          {/* Main Tip Button Demo */}
          <div className="flex justify-center mb-12">
            <div className="glass-effect p-8 rounded-2xl max-w-md">
              <TipButton 
                onClick={() => handleTip('demo')}
                className="scale-125"
              />
              <p className="text-sm text-white/60 mt-4">
                Click to see the tip flow in action
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <CardTitle>Post-Specific Tipping</CardTitle>
              <CardDescription>
                Attach tip buttons to posts and monetize every like
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <CardTitle>Secure Wallet Integration</CardTitle>
              <CardDescription>
                Seamless Base wallet integration with WalletConnect
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <CardTitle>On-Chain Transactions</CardTitle>
              <CardDescription>
                Fast and secure ETH/USDC transfers on Base network
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Dashboard</h2>
          <DashboardStats />
        </div>

        {/* Sample Posts */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Tippable Posts</h2>
          {samplePosts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              variant="withTipButton"
              onTip={handleTip}
            />
          ))}
        </div>

        {/* Wallet Integration Demo */}
        <Card className="text-center glass-effect max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white">Ready to Start Earning?</CardTitle>
            <CardDescription className="text-white/80">
              Connect your wallet to enable tipping on your Farcaster posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Enable Tipping on My Posts
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Transaction Status Overlay */}
      <TransactionStatusOverlay
        status={transactionStatus}
        onClose={closeTransactionOverlay}
        amount="0.001 ETH"
        recipient="@user12345"
      />
    </div>
  );
}
