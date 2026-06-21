import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')
    const isProtectedPage = request.nextUrl.pathname.startsWith('/preview') || request.nextUrl.pathname.startsWith('/project') || request.nextUrl.pathname.startsWith('/create') || request.nextUrl.pathname.startsWith('/edit') || request.nextUrl.pathname.startsWith('/edit')

    if (!user && isProtectedPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && isAuthPage) {
        // Klien yang sudah login tidak perlu melihat halaman login lagi
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
}

// Hanya jalankan middleware ini pada halaman tertentu agar efisien
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}