export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    username: string
                    display_name: string | null
                    bio: string | null
                    avatar_url: string | null
                    theme: string
                    created_at: string
                }
                Insert: {
                    id: string
                    username: string
                    display_name?: string | null
                    bio?: string | null
                    avatar_url?: string | null
                    theme?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    display_name?: string | null
                    bio?: string | null
                    avatar_url?: string | null
                    theme?: string
                    created_at?: string
                }
            }
            clothing_items: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    brand: string | null
                    price: number | null
                    currency: string
                    image_url: string | null
                    link_url: string
                    category: string | null
                    position: number
                    is_active: boolean
                    clicks: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    brand?: string | null
                    price?: number | null
                    currency?: string
                    image_url?: string | null
                    link_url: string
                    category?: string | null
                    position?: number
                    is_active?: boolean
                    clicks?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    brand?: string | null
                    price?: number | null
                    currency?: string
                    image_url?: string | null
                    link_url?: string
                    category?: string | null
                    position?: number
                    is_active?: boolean
                    clicks?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

export type User = Database['public']['Tables']['users']['Row']
export type ClothingItem = Database['public']['Tables']['clothing_items']['Row']
export type InsertClothingItem = Database['public']['Tables']['clothing_items']['Insert']
export type UpdateClothingItem = Database['public']['Tables']['clothing_items']['Update']
