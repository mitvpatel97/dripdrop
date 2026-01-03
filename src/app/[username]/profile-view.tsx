'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ClothingItem, User } from '@/types/database.types'
import { ClothingCard } from '@/components/clothing-card'

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
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-500/5">
            {/* Background decorations - water drops effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl" />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 max-w-lg">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-cyan-500/30">
                        <AvatarImage src={profile.avatar_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-3xl">
                            {profile.display_name?.charAt(0) || '💧'}
                        </AvatarFallback>
                    </Avatar>

                    <h1 className="text-2xl font-bold mb-1">
                        {profile.display_name || `@${profile.username}`}
                    </h1>

                    <p className="text-cyan-400 text-sm mb-3">
                        @{profile.username}
                    </p>

                    {profile.bio && (
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                            {profile.bio}
                        </p>
                    )}
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
