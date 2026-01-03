'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: '💧',
    title: 'One Link, All Your Drops',
    description: 'Share all your latest clothing purchases with a single link in your bio.',
  },
  {
    icon: '📱',
    title: 'Made for Social',
    description: 'Optimized for Instagram and TikTok. Looks stunning on any device.',
  },
  {
    icon: '📊',
    title: 'Track Your Drip',
    description: 'See which items your followers love most with detailed analytics.',
  },
  {
    icon: '⚡',
    title: 'Instant Loading',
    description: 'Your page loads instantly, so followers never wait.',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/30 to-cyan-950/30 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              💧
            </motion.span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DripDrop
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-purple-500/10">Log in</Button>
            </Link>
            <Link href="/login?signup=true">
              <Button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-6 py-3 mb-6 text-sm font-bold rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-transparent bg-clip-text border-2 border-purple-500/30 shadow-lg shadow-purple-500/20">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                💧 The link-in-bio for Instagram influencers
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Share Your
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Latest Drops 💧
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Create a shareable page with direct links to your recently purchased clothing.
            Perfect for Instagram and TikTok bios. Let your followers shop your drip instantly.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?signup=true">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl shadow-purple-500/50 font-bold">
                  Start Sharing — It&apos;s Free ✨
                </Button>
              </motion.div>
            </Link>
            <Link href="/demo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 border-2 border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-500 font-semibold">
                  See Demo 👀
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mock Profile Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 max-w-sm mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl animate-pulse" />
            <Card className="relative rounded-3xl overflow-hidden bg-card/80 backdrop-blur border-2 border-purple-500/30 p-6 shadow-2xl">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-purple-500/50">
                  💧
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">@dripqueen</h3>
                <p className="text-sm text-muted-foreground">NYC | Fashion Influencer 💫</p>
              </div>

              <div className="space-y-3">
                {['Zara Oversized Blazer', 'Nike Air Max 90', 'Levi\'s 501 Jeans'].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-pink-500/20 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/40 via-purple-500/40 to-pink-500/40 flex items-center justify-center shadow-lg">
                      💧
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">{item}</p>
                      <p className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">${(49 + i * 30)}.00</p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-purple-400 transition-colors font-bold">→</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="p-6 h-full bg-card/80 backdrop-blur border-2 border-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Shareable Link Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 shadow-2xl">
            <motion.span
              className="text-6xl mb-6 block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💧
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              One Link. Endless Drip.
            </h2>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto text-lg">
              Get your personal page at <span className="text-purple-400 font-mono font-bold">dripdrop.app/yourname</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Share it anywhere — Instagram, TikTok, Twitter, or text. Your followers get instant access to your latest clothing drops.
            </p>
            <Link href="/login?signup=true">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50 font-bold">
                  Claim Your Link ✨
                </Button>
              </motion.div>
            </Link>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 DripDrop. Made with 💧 for fashion lovers.</p>
        </div>
      </footer>
    </div>
  )
}
