'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { logout } from '@/app/login/actions'
import { addClothingItem, deleteClothingItem, updateClothingItem } from './actions'
import { ClothingItem, User as DBUser } from '@/types/database.types'

interface DashboardClientProps {
    user: User
    profile: DBUser | null
    initialItems: ClothingItem[]
}

export function DashboardClient({ user, profile, initialItems }: DashboardClientProps) {
    const [items, setItems] = useState<ClothingItem[]>(initialItems)
    const [isAddingItem, setIsAddingItem] = useState(false)
    const [editingItem, setEditingItem] = useState<ClothingItem | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddItem = async (formData: FormData) => {
        setIsLoading(true)
        try {
            const result = await addClothingItem({
                title: formData.get('title') as string,
                brand: formData.get('brand') as string || null,
                price: formData.get('price') ? parseFloat(formData.get('price') as string) : null,
                currency: 'USD',
                image_url: formData.get('image_url') as string || null,
                link_url: formData.get('link_url') as string,
                category: formData.get('category') as string || null,
            })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Drop added!')
                setIsAddingItem(false)
                window.location.reload()
            }
        } catch {
            toast.error('Failed to add item')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteItem = async (id: string) => {
        try {
            const result = await deleteClothingItem(id)
            if (result.error) {
                toast.error(result.error)
            } else {
                setItems(items.filter(item => item.id !== id))
                toast.success('Drop removed!')
            }
        } catch {
            toast.error('Failed to delete item')
        }
    }

    const handleToggleActive = async (item: ClothingItem) => {
        try {
            const result = await updateClothingItem(item.id, { is_active: !item.is_active })
            if (result.error) {
                toast.error(result.error)
            } else {
                setItems(items.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i))
            }
        } catch {
            toast.error('Failed to update item')
        }
    }

    const totalClicks = items.reduce((acc, item) => acc + item.clicks, 0)
    const shareUrl = profile ? `dripdrop.app/${profile.username}` : ''

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://${shareUrl}`)
        toast.success('Link copied! Share it anywhere 💧')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-500/5">
            {/* Header */}
            <header className="border-b border-cyan-500/20 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">💧</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            DripDrop
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {profile && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopyLink}
                                className="border-cyan-500/30 hover:bg-cyan-500/10"
                            >
                                📋 Copy Link
                            </Button>
                        )}
                        {profile && (
                            <Link
                                href={`/${profile.username}`}
                                target="_blank"
                                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                            >
                                View page →
                            </Link>
                        )}
                        <form action={logout}>
                            <Button variant="ghost" size="sm">
                                Log out
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Card className="p-6 bg-card/50 backdrop-blur border-cyan-500/20">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20 ring-4 ring-cyan-500/20">
                                    <AvatarImage src={profile?.avatar_url || undefined} />
                                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl">
                                        {profile?.display_name?.charAt(0) || user.email?.charAt(0) || '💧'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold">{profile?.display_name || 'Your Name'}</h1>
                                    <p className="text-cyan-400 font-mono text-sm">
                                        {shareUrl || 'dripdrop.app/username'}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {profile?.bio || 'Add a bio to your profile'}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" className="border-cyan-500/30 hover:bg-cyan-500/10">
                                    Edit Profile
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-3 gap-4 mb-8"
                    >
                        <Card className="p-4 text-center bg-card/50 backdrop-blur border-cyan-500/20">
                            <p className="text-3xl font-bold text-cyan-400">{items.length}</p>
                            <p className="text-sm text-muted-foreground">Drops</p>
                        </Card>
                        <Card className="p-4 text-center bg-card/50 backdrop-blur border-cyan-500/20">
                            <p className="text-3xl font-bold text-cyan-400">{totalClicks}</p>
                            <p className="text-sm text-muted-foreground">Total Clicks</p>
                        </Card>
                        <Card className="p-4 text-center bg-card/50 backdrop-blur border-cyan-500/20">
                            <p className="text-3xl font-bold text-cyan-400">{items.filter(i => i.is_active).length}</p>
                            <p className="text-sm text-muted-foreground">Active</p>
                        </Card>
                    </motion.div>

                    {/* Items Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Your Drops</h2>
                            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                                        + Add Drop
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md border-cyan-500/20">
                                    <DialogHeader>
                                        <DialogTitle>Add New Drop</DialogTitle>
                                    </DialogHeader>
                                    <form action={handleAddItem} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title *</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="e.g., Zara Oversized Blazer"
                                                required
                                                className="border-cyan-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand</Label>
                                            <Input
                                                id="brand"
                                                name="brand"
                                                placeholder="e.g., Zara"
                                                className="border-cyan-500/20"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="49.99"
                                                    className="border-cyan-500/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Input
                                                    id="category"
                                                    name="category"
                                                    placeholder="e.g., Outerwear"
                                                    className="border-cyan-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link_url">Product Link *</Label>
                                            <Input
                                                id="link_url"
                                                name="link_url"
                                                type="url"
                                                placeholder="https://..."
                                                required
                                                className="border-cyan-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="image_url">Image URL</Label>
                                            <Input
                                                id="image_url"
                                                name="image_url"
                                                type="url"
                                                placeholder="https://..."
                                                className="border-cyan-500/20"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                        >
                                            {isLoading ? 'Adding...' : 'Add Drop'}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Separator className="mb-4 bg-cyan-500/20" />

                        {/* Items List */}
                        <AnimatePresence>
                            {items.length === 0 ? (
                                <Card className="p-12 text-center bg-card/50 backdrop-blur border-cyan-500/20 border-dashed">
                                    <p className="text-4xl mb-4">💧</p>
                                    <h3 className="text-lg font-semibold mb-2">No drops yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Add your first drop to start sharing!
                                    </p>
                                    <Button
                                        onClick={() => setIsAddingItem(true)}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600"
                                    >
                                        + Add Your First Drop
                                    </Button>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card className={`p-4 bg-card/50 backdrop-blur border-cyan-500/20 transition-all ${!item.is_active ? 'opacity-50' : ''
                                                }`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="cursor-grab text-muted-foreground hover:text-foreground">
                                                        ⋮⋮
                                                    </div>

                                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
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

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold truncate">{item.title}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.brand && `${item.brand} • `}
                                                            {item.price ? `$${item.price}` : 'No price'}
                                                        </p>
                                                    </div>

                                                    <div className="text-center px-4">
                                                        <p className="font-semibold text-cyan-400">{item.clicks}</p>
                                                        <p className="text-xs text-muted-foreground">clicks</p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleToggleActive(item)}
                                                        >
                                                            {item.is_active ? '👁️' : '👁️‍🗨️'}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setEditingItem(item)}
                                                        >
                                                            ✏️
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            🗑️
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
