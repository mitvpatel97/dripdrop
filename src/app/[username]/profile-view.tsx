'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ClothingItem, User } from '@/types/database.types'
import { ClothingCard } from '@/components/clothing-card'
import { ShareDialog } from '@/components/share-dialog'
import { Sparkles } from 'lucide-react'

interface ProfileViewProps {
    profile: User
    items: ClothingItem[]
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

export function ProfileView({ profile, items }: ProfileViewProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-cyan-950/20">
            {/* Background decorations - vibrant gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-pink-500/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 max-w-lg">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="relative inline-block mb-4">
                        <Avatar className="w-28 h-28 mx-auto ring-4 ring-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                            <AvatarImage src={profile.avatar_url || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 text-4xl">
                                {profile.display_name?.charAt(0) || '💧'}
                            </AvatarFallback>
                        </Avatar>
                        <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                            <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {profile.display_name || `@${profile.username}`}
                    </h1>

                    <p className="text-cyan-400 text-sm mb-4 font-medium">
                        @{profile.username}
                    </p>

                    {profile.bio && (
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm mb-4">
                            {profile.bio}
                        </p>
                    )}

                    {/* Share Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4"
                    >
                        <ShareDialog
                            username={profile.username}
                            displayName={profile.display_name || undefined}
                        />
                    </motion.div>
                </motion.div>

                {/* Clothing Items */}
                {items.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-3"
                    >
                        {items.map((clothingItem) => (
                            <motion.div key={clothingItem.id} variants={item}>
                                <ClothingCard item={clothingItem} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-muted-foreground">
                            No drops to display yet.
                        </p>
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 pt-8 border-t border-cyan-500/20"
                >
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors text-sm"
                    >
                        <span>💧</span>
                        <span>Create your DripDrop</span>
                    </a>
                </motion.div>
            </main>
        </div>
    )
}
