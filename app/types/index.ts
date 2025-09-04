export interface User {
  fid: string;
  walletAddress: string;
  createdAt: string;
}

export interface Post {
  postId: string;
  fid: string;
  content: string;
  createdAt: string;
  isTippable: boolean;
  tippingContractAddress?: string;
  author?: User;
}

export interface Tip {
  tipId: string;
  postId: string;
  tipperWalletAddress: string;
  recipientFid: string;
  amount: string;
  tokenAddress: string;
  transactionHash: string;
  timestamp: string;
  post?: Post;
}

export interface TipButtonProps {
  variant?: 'default' | 'disabled' | 'loading';
  onClick?: () => void;
  amount?: string;
  className?: string;
}

export interface PostCardProps {
  post: Post;
  variant?: 'withTipButton';
  onTip?: (postId: string) => void;
}

export interface TransactionStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  hash?: string;
  error?: string;
}
