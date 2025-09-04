import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LikeTribute - Turn your Likes into Liquid Love',
  description: 'A Farcaster miniapp that allows users to receive on-chain tips directly from their likes on posts.',
  openGraph: {
    title: 'LikeTribute',
    description: 'Turn your Likes into Liquid Love',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
