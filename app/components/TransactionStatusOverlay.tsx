'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Loader2, ExternalLink, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { TransactionStatus } from '../types';

interface TransactionStatusOverlayProps {
  status: TransactionStatus;
  onClose: () => void;
  amount?: string;
  recipient?: string;
}

export function TransactionStatusOverlay({ 
  status, 
  onClose, 
  amount = '0.001 ETH',
  recipient 
}: TransactionStatusOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status.status !== 'idle') {
      setIsVisible(true);
    }
  }, [status.status]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 150);
  };

  if (!isVisible || status.status === 'idle') return null;

  const getStatusContent = () => {
    switch (status.status) {
      case 'pending':
        return {
          icon: <Loader2 className="w-8 h-8 animate-spin text-blue-500" />,
          title: 'Processing Tip',
          message: `Sending ${amount} tip...`,
          showClose: false,
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: 'Tip Sent Successfully!',
          message: `${amount} has been sent to ${recipient || 'the creator'}`,
          showClose: true,
        };
      case 'error':
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: 'Transaction Failed',
          message: status.error || 'Something went wrong. Please try again.',
          showClose: true,
        };
      default:
        return null;
    }
  };

  const content = getStatusContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-sm animate-slide-up">
        <CardContent className="p-6 text-center">
          {content.showClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-2 right-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <div className="mb-4">
            {content.icon}
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {content.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {content.message}
          </p>
          
          {status.status === 'success' && status.hash && (
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://basescan.org/tx/${status.hash}`, '_blank')}
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Basescan
              </Button>
              <Button onClick={handleClose} className="w-full">
                Continue
              </Button>
            </div>
          )}
          
          {status.status === 'error' && (
            <Button onClick={handleClose} variant="outline" className="w-full">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
