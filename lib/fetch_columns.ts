import { createBrowserClient } from "@supabase/ssr"

/**
 * Utility to fetch specific columns for a project from Supabase.
 * Extracted to match the standards of api-client.ts
 */
export async function fetchProjectColumns(projectId: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    
    // Inisialisasi menggunakan SSR client, sesuai dengan standar di api-client.ts
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase
        .from("projects")
        .select("business_name, created_at, updated_at, content_data, folder_path, public_url")
        .eq("id", projectId)
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}
