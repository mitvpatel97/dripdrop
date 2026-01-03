'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signup } from './actions'
import { toast } from 'sonner'

function LoginForm() {
    const searchParams = useSearchParams()
    const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        try {
            const result = isSignup ? await signup(formData) : await login(formData)
            if (result?.error) {
                toast.error(result.error)
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="p-8 bg-card/50 backdrop-blur border-cyan-500/20">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                    {isSignup ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {isSignup
                        ? 'Start sharing your drip with the world'
                        : 'Sign in to manage your DripDrop page'}
                </p>
            </div>

            <form action={handleSubmit} className="space-y-4">
                {isSignup && (
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                dripdrop.app/
                            </span>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="yourname"
                                required={isSignup}
                                className="pl-28 border-cyan-500/20 focus:border-cyan-500/50"
                                pattern="[a-zA-Z0-9_]+"
                                minLength={3}
                                maxLength={20}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            This will be your shareable link
                        </p>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="border-cyan-500/20 focus:border-cyan-500/50"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="border-cyan-500/20 focus:border-cyan-500/50"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {isSignup ? 'Creating account...' : 'Signing in...'}
                        </span>
                    ) : (
                        isSignup ? 'Create account' : 'Sign in'
                    )}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                {isSignup ? (
                    <p className="text-muted-foreground">
                        Already have an account?{' '}
                        <button
                            onClick={() => setIsSignup(false)}
                            className="text-cyan-400 hover:underline font-medium"
                        >
                            Sign in
                        </button>
                    </p>
                ) : (
                    <p className="text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={() => setIsSignup(true)}
                            className="text-cyan-400 hover:underline font-medium"
                        >
                            Sign up free
                        </button>
                    </p>
                )}
            </div>
        </Card>
    )
}

function LoginFormFallback() {
    return (
        <Card className="p-8 bg-card/50 backdrop-blur border-cyan-500/20 animate-pulse">
            <div className="text-center mb-8">
                <div className="h-8 bg-muted rounded w-48 mx-auto mb-2" />
                <div className="h-4 bg-muted rounded w-64 mx-auto" />
            </div>
            <div className="space-y-4">
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
            </div>
        </Card>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-cyan-500/5 p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-3xl">💧</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        DripDrop
                    </span>
                </Link>

                <Suspense fallback={<LoginFormFallback />}>
                    <LoginForm />
                </Suspense>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    )
}
