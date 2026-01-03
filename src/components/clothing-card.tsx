'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClothingItem } from '@/types/database.types'
import { createClient } from '@/lib/supabase/client'
import confetti from 'canvas-confetti'
import { ExternalLink } from 'lucide-react'

interface ClothingCardProps {
    item: ClothingItem
}

export function ClothingCard({ item }: ClothingCardProps) {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = async () => {
        setIsClicked(true)

        // Confetti animation
        const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: colors,
            ticks: 100,
        })

        // Track click
        try {
            const supabase = createClient()
            await supabase
                .from('clothing_items')
                .update({ clicks: 1 } as never)
                .eq('id', item.id)
        } catch {
            // Silently fail - don't block navigation
        }

        // Navigate after a brief delay
        setTimeout(() => {
            window.open(item.link_url, '_blank', 'noopener,noreferrer')
            setIsClicked(false)
        }, 150)
    }

    const gradientBorders = [
        'from-cyan-500 via-purple-500 to-pink-500',
        'from-purple-500 via-pink-500 to-cyan-500',
        'from-pink-500 via-cyan-500 to-purple-500',
        'from-cyan-500 via-blue-500 to-purple-500',
    ]
    const randomGradient = gradientBorders[Math.floor(Math.random() * gradientBorders.length)]

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative overflow-hidden rounded-2xl"
        >
            {/* Gradient border effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${randomGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />

            <div className={`relative rounded-2xl bg-card/80 backdrop-blur border-2 ${isClicked ? `border-transparent bg-gradient-to-r ${randomGradient} p-[2px]` : 'border-border/50 group-hover:border-transparent'} transition-all duration-300`}>
                {isClicked && <div className="absolute inset-[2px] bg-card rounded-2xl" />}

                <div className="relative">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <div className="relative flex items-center gap-4 p-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-pink-500/30 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ring-2 ring-transparent group-hover:ring-white/20">
                            {item.image_url ? (
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl">💧</span>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 text-left min-w-0">
                            <h3 className="font-bold text-lg truncate bg-gradient-to-r from-foreground to-foreground group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 bg-clip-text transition-all duration-300">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                                {item.brand && <span className="font-medium">{item.brand}</span>}
                                {item.brand && item.price && <span>•</span>}
                                {item.price && (
                                    <span className="font-bold text-foreground bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        ${item.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {item.category && (
                                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-cyan-400 border border-cyan-500/30">
                                    {item.category}
                                </span>
                            )}
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                            <ExternalLink className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    )
}
