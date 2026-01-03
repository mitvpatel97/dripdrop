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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-500/5">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💧</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              DripDrop
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/login?signup=true">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
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
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              💧 The link-in-bio for your drip
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Share Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Latest Drops
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
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25">
                Start Sharing — It&apos;s Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-cyan-500/30 hover:bg-cyan-500/10">
                See Demo
              </Button>
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
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <Card className="relative rounded-3xl overflow-hidden bg-card/50 backdrop-blur border-cyan-500/20 p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl mb-4">
                  💧
                </div>
                <h3 className="text-lg font-semibold">@dripqueen</h3>
                <p className="text-sm text-muted-foreground">NYC | Fashion Obsessed 💦</p>
              </div>

              <div className="space-y-3">
                {['Zara Oversized Blazer', 'Nike Air Max 90', 'Levi\'s 501 Jeans'].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                      💧
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{item}</p>
                      <p className="text-xs text-muted-foreground">${(49 + i * 30)}.00</p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-cyan-400 transition-colors">→</span>
                  </div>
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
            <motion.div key={i} variants={fadeInUp}>
              <Card className="p-6 h-full bg-card/50 backdrop-blur border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
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
          <Card className="p-12 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-cyan-500/20">
            <span className="text-6xl mb-6 block">💧</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One Link. Endless Drip.
            </h2>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
              Get your personal page at <span className="text-cyan-400 font-mono">dripdrop.app/yourname</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Share it anywhere — Instagram, TikTok, Twitter, or text. Your followers get instant access to your latest clothing drops.
            </p>
            <Link href="/login?signup=true">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Claim Your Link
              </Button>
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
