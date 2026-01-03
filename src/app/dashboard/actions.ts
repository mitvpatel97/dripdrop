'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { InsertClothingItem, UpdateClothingItem, ClothingItem, User } from '@/types/database.types'

export async function getClothingItems() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('clothing_items')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true }) as { data: ClothingItem[] | null; error: unknown }

    if (error) {
        console.error('Error fetching items:', error)
        return []
    }

    return data || []
}

export async function addClothingItem(item: Omit<InsertClothingItem, 'user_id'>) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    // Get the highest position
    const { data: maxPosData } = await supabase
        .from('clothing_items')
        .select('position')
        .eq('user_id', user.id)
        .order('position', { ascending: false })
        .limit(1) as { data: { position: number }[] | null }

    const nextPosition = maxPosData && maxPosData.length > 0 ? maxPosData[0].position + 1 : 0

    const insertData = {
        ...item,
        user_id: user.id,
        position: nextPosition,
    }

    const { error } = await supabase.from('clothing_items').insert(insertData as never)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function updateClothingItem(id: string, updates: UpdateClothingItem) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('clothing_items')
        .update(updates as never)
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function deleteClothingItem(id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function reorderItems(itemIds: string[]) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    // Update positions
    for (let i = 0; i < itemIds.length; i++) {
        await supabase
            .from('clothing_items')
            .update({ position: i } as never)
            .eq('id', itemIds[i])
            .eq('user_id', user.id)
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function getUserProfile() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single() as { data: User | null }

    return data
}

export async function updateUserProfile(updates: {
    display_name?: string
    bio?: string
    avatar_url?: string
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('users')
        .update(updates as never)
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function trackClick(itemId: string) {
    const supabase = await createClient()

    // Increment clicks - use direct update
    await supabase
        .from('clothing_items')
        .update({ clicks: 1 } as never)
        .eq('id', itemId)
}

