'use client';

import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, DollarSign, Heart } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      title: 'Total Tips Received',
      value: '$1,284.50',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Active Tippers',
      value: '47',
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Tippable Posts',
      value: '23',
      change: '+5',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      title: 'Engagement Rate',
      value: '8.9%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs text-green-500 font-medium">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
