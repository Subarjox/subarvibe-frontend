// [Certain] Bantai impor supabase-js lawas, gunakan mesin SSR
import { createBrowserClient } from "@supabase/ssr"

// Paku mati Ngrok-mu di sini
const API_BASE_URL = "https://diligent-overpay-stingray.ngrok-free.dev"

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    // [Certain] Inisialisasi HARUS berada di DALAM fungsi eksekutor.
    // Jika ditaruh di luar sebagai variabel global, ia tidak akan bisa membaca pembaruan Cookie secara dinamis!
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

    // 1. Sedot sesi aktif langsung dari brankas Cookies peramban
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
        console.error("[AUTH] Gagal mengambil sesi dari Cookies. Klien mungkin belum login.")
        throw new Error("Unauthorized")
    }

    // 2. Siapkan Header dasar
    const headers = new Headers(options.headers || {})

    // [Certain] INJEKSI PASPOR DIGITAL MUTLAK
    headers.set("Authorization", `Bearer ${session.access_token}`)

    // Perisai anti-blokir Ngrok
    headers.set("ngrok-skip-browser-warning", "true")

    // Pastikan Content-Type ada jika ada body (kecuali untuk unggah gambar/FormData)
    if (options.body && !headers.has("Content-Type")) {
        if (!(options.body instanceof FormData)) {
            headers.set("Content-Type", "application/json")
        }
    }

    // 3. Eksekusi tembakan ke FastAPI
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    return response
}