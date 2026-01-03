import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileView } from './profile-view'
import { User, ClothingItem } from '@/types/database.types'

interface ProfilePageProps {
    params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ProfilePageProps) {
    const { username } = await params
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('users')
        .select('display_name, bio, avatar_url')
        .eq('username', username.toLowerCase())
        .single() as { data: Pick<User, 'display_name' | 'bio' | 'avatar_url'> | null }

    if (!profile) {
        return { title: 'User not found | DripDrop' }
    }

    const displayName = profile.display_name || username
    const description = profile.bio || `Check out ${displayName}'s latest clothing drops on DripDrop 💧`
    const title = `${displayName} | DripDrop`
    const url = `https://dripdrop.app/${username}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: 'DripDrop',
            images: [
                {
                    url: profile.avatar_url || 'https://dripdrop.app/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${displayName}'s profile on DripDrop`,
                },
            ],
            locale: 'en_US',
            type: 'profile',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [profile.avatar_url || 'https://dripdrop.app/og-image.png'],
            creator: `@${username}`,
        },
        other: {
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params
    const supabase = await createClient()

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('username', username.toLowerCase())
        .single() as { data: User | null }

    if (!profile) {
        notFound()
    }

    // Get active clothing items
    const { data: items } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('user_id', profile.id)
        .eq('is_active', true)
        .order('position', { ascending: true }) as { data: ClothingItem[] | null }

    return <ProfileView profile={profile} items={items || []} />
}
