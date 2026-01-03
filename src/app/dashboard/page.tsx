import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    // Get clothing items
    const { data: items } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true })

    return (
        <DashboardClient
            user={user}
            profile={profile}
            initialItems={items || []}
        />
    )
}
