'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClothingItem } from '@/types/database.types'
import { createClient } from '@/lib/supabase/client'

interface ClothingCardProps {
    item: ClothingItem
}

export function ClothingCard({ item }: ClothingCardProps) {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = async () => {
        setIsClicked(true)

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

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 ${isClicked ? 'ring-2 ring-cyan-500' : ''
                }`}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-4 p-4">
                {/* Product Image */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:ring-2 group-hover:ring-cyan-500/30 transition-all">
                    {item.image_url ? (
                        <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-2xl">💧</span>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold truncate group-hover:text-cyan-400 transition-colors">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {item.brand && <span>{item.brand}</span>}
                        {item.brand && item.price && <span>•</span>}
                        {item.price && (
                            <span className="font-medium text-foreground">
                                ${item.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    {item.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {item.category}
                        </span>
                    )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </motion.button>
    )
}
