import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'DripDrop - Share Your Fashion Drops 💧',
  description: 'The link-in-bio for Instagram influencers. Share your latest clothing purchases with followers. One link, endless drip.',
  keywords: ['fashion', 'influencer', 'link in bio', 'instagram', 'shopping', 'clothing drops', 'style'],
  authors: [{ name: 'DripDrop' }],
  creator: 'DripDrop',
  publisher: 'DripDrop',
  metadataBase: new URL('https://dripdrop.app'),
  openGraph: {
    title: 'DripDrop - Share Your Fashion Drops 💧',
    description: 'The link-in-bio for Instagram influencers. Share your latest clothing purchases with followers. One link, endless drip.',
    url: 'https://dripdrop.app',
    siteName: 'DripDrop',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DripDrop - Share Your Fashion Drops',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DripDrop - Share Your Fashion Drops 💧',
    description: 'The link-in-bio for Instagram influencers. Share your latest clothing purchases with followers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
