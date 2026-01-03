'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Share2, Copy, Check, Instagram, Twitter, Facebook } from 'lucide-react'
import confetti from 'canvas-confetti'

interface ShareDialogProps {
    username: string
    displayName?: string
    trigger?: React.ReactNode
}

export function ShareDialog({ username, displayName, trigger }: ShareDialogProps) {
    const [copied, setCopied] = useState(false)
    const [showQR, setShowQR] = useState(false)
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/${username}` : `https://dripdrop.app/${username}`
    const shareText = `Check out ${displayName || `@${username}`}'s latest drops on DripDrop! 💧`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)

            // Confetti animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981']
            })

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const shareToInstagram = () => {
        // Instagram doesn't have direct URL sharing, so we copy and guide the user
        copyToClipboard()
        alert('Link copied! Paste it in your Instagram bio or story.')
    }

    const shareToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    }

    const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        window.open(facebookUrl, '_blank', 'noopener,noreferrer')
    }

    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${displayName || `@${username}`} on DripDrop`,
                    text: shareText,
                    url: shareUrl,
                })
            } catch (err) {
                console.log('Share cancelled or failed:', err)
            }
        } else {
            copyToClipboard()
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Profile
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Share Your Drip 💧
                    </DialogTitle>
                    <DialogDescription>
                        Share your profile with your followers on social media
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Copy Link */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your link</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg"
                            />
                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                className="flex-shrink-0"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Check className="w-4 h-4 text-green-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Share on social media</label>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                onClick={shareToInstagram}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3 border-pink-500/30 hover:bg-pink-500/10 hover:border-pink-500/50"
                            >
                                <Instagram className="w-5 h-5 text-pink-500" />
                                <span className="text-xs">Instagram</span>
                            </Button>
                            <Button
                                onClick={shareToTwitter}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                            >
                                <Twitter className="w-5 h-5 text-cyan-500" />
                                <span className="text-xs">Twitter</span>
                            </Button>
                            <Button
                                onClick={shareToFacebook}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50"
                            >
                                <Facebook className="w-5 h-5 text-blue-500" />
                                <span className="text-xs">Facebook</span>
                            </Button>
                        </div>
                    </div>

                    {/* Native Share (Mobile) */}
                    {typeof navigator !== 'undefined' && navigator.share && (
                        <Button
                            onClick={shareNative}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share via...
                        </Button>
                    )}

                    {/* QR Code Toggle */}
                    <Button
                        onClick={() => setShowQR(!showQR)}
                        variant="outline"
                        className="w-full"
                    >
                        {showQR ? 'Hide' : 'Show'} QR Code
                    </Button>

                    <AnimatePresence>
                        {showQR && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex justify-center p-4 bg-white rounded-lg"
                            >
                                <div className="text-center">
                                    <div className="w-48 h-48 mx-auto mb-2 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-lg flex items-center justify-center">
                                        <div className="text-6xl">📱</div>
                                    </div>
                                    <p className="text-xs text-gray-600">Scan to view profile</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    )
}
