"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { ProjectDetailDrawer } from "./project-detail-drawer"

export default function PreviewProjectPage() {
    // [Certain] Tangkap ID proyek dari URL
    const searchParams = useSearchParams()
    const projectId = searchParams.get("id")

    // State untuk menerjemahkan UUID ke Folder Path
    const [folderPath, setFolderPath] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [iframeRefreshKey, setIframeRefreshKey] = useState(0)

    useEffect(() => {
        setIframeRefreshKey(Date.now())
        if (!projectId) return

        const fetchProjectDetails = async () => {
            setIsLoading(true)

            // Inisialisasi klien penembus brankas
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
            const supabase = createBrowserClient(supabaseUrl, supabaseKey)

            // [Certain] Tarik nama folder asli dari Supabase berdasarkan UUID
            const { data, error } = await supabase
                .from("projects")
                .select("folder_path")
                .eq("id", projectId)
                .single()

            if (error || !data) {
                console.error("Gagal menarik data folder:", error)
            } else {
                setFolderPath(data.folder_path)
            }

            setIsLoading(false)
        }

        fetchProjectDetails()
    }, [projectId])

    // Layar pemuatan saat melakukan kueri translasi
    if (!projectId || isLoading) {
        return (
            <div className="flex h-full items-center justify-center bg-background text-muted-foreground animate-pulse">
                Menarik data arsitektur proyek...
            </div>
        )
    }

    // Layar penolakan jika UUID tidak ada di pangkalan data
    if (!folderPath) {
        return (
            <div className="flex h-full items-center justify-center bg-background text-destructive font-medium">
                404 - Proyek tidak ditemukan di Database.
            </div>
        )
    }

    // [Likely] Arahkan ke Ngrok menggunakan FOLDER PATH, bukan UUID!
    // Menambahkan cache busting parameter ?t=... agar iframe memuat versi paling baru
    const iframeUrl = `https://diligent-overpay-stingray.ngrok-free.dev/projects/${folderPath}/index.html?t=${iframeRefreshKey}`

    return (
        <div className="flex h-full flex-col">
            {/* Topbar */}
            <div className="relative flex h-[var(--header-height)] shrink-0 items-center justify-between border-b px-4">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="-ms-1 text-muted-foreground hover:text-foreground" />
                    <h1 className="text-sm font-semibold text-foreground truncate max-w-[200px]" title={projectId}>
                        {folderPath} {/* Tampilkan nama folder aslinya agar lebih manusiawi */}
                    </h1>
                </div>

                {/* Center */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
                    <h1 className="text-sm font-semibold text-foreground">
                        Preview Mode
                    </h1>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-[220px]">
                                <div className="text-xs font-medium">This is a preview mode, go to edit mode if you want to edit your website</div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Right */}
                <div className="flex items-center gap-5">
                    <ProjectDetailDrawer
                        projectId={projectId}
                        trigger={
                            <button className="text-sm font-medium hover:opacity-80 hover:underline">
                                Project Details
                            </button>
                        }
                    />

                    <Link href={`/edit?id=${projectId}`}>
                        <Button
                            className="rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 h-8 transition-transform hover:scale-[1.02]"
                        >
                            Edit Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Container */}
            <div className="mx-4 mb-4 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                {/* Iframe Area */}
                <div className="relative flex h-full w-full flex-1 items-center justify-center bg-card">
                    {/* [Certain] Render Iframe menggunakan URL fisik yang tervalidasi */}
                    <iframe
                        src={iframeUrl}
                        className="absolute inset-0 h-full w-full border-0 bg-white"
                        title="Website Preview"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            </div>
        </div>
    )
}