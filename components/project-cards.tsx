"use client"

import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, Download04Icon, PencilEdit02Icon, FolderOpenIcon, MoreHorizontalCircle01Icon, AddCircleIcon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { handleDownloadProject } from "@/lib/download-project"

// [Likely] Definisikan struktur data proyek agar TypeScript tidak marah
interface Project {
    id: string
    business_name: string
    status: string
    created_at: string
    content_data: any // JSONB dari Supabase
    folder_path: string;
}

export function ProjectCards({ initialProjects }: { initialProjects: Project[] }) {
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-4 lg:px-6">
            <DeleteProjectDialog
                open={!!deleteProjectId}
                onOpenChange={(open) => !open && setDeleteProjectId(null)}
                projectId={deleteProjectId}
            />

            {/* Kartu Tombol Create Tetap Statis di Depan */}
            <Card className="group cursor-pointer rounded-xl border border-dashed border-border bg-card transition-all duration-200 hover:border-zinc-700 dark:hover:border-zinc-300 hover:bg-muted/40">
                <Link href='/create'>
                    <CardContent className="flex h-[260px] flex-col items-center justify-center gap-3 p-4 translate-y-5">
                        <HugeiconsIcon
                            icon={AddCircleIcon}
                            strokeWidth={1.5}
                            className="size-12 text-muted-foreground"
                        />
                        <div className="text-center">
                            <p className="text-lg font-medium text-foreground">
                                Add New Project
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Create a new website for your needs
                            </p>
                        </div>
                    </CardContent>
                </Link>
            </Card>

            {/* [Certain] Eksekusi Mapping Database Mutlak */}
            {initialProjects.map((proj) => (
                <Card key={proj.id} className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-zinc-700 dark:hover:border-zinc-300">

                    {/* Status Badge (queued, generating, ready) */}
                    <div className="absolute left-4 top-4 z-20">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${proj.status === 'ready' ? 'bg-green-100 text-green-800' :
                            proj.status === 'generating' ? 'bg-blue-100 text-blue-800 animate-pulse' :
                                proj.status === 'failed' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                            }`}>
                            {proj.status.toUpperCase()}
                        </span>
                    </div>

                    {/* Menu Dropdown */}
                    <div className="absolute right-4 top-4 z-20 opacity-30 transition-opacity duration-200 group-hover:opacity-100">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="secondary" className="h-8 w-8 border border-border bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground">
                                    <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} className="size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-xl">
                                <Link href={`/preview?id=${proj.id}`}>
                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} className="size-4" />
                                        Open
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem 
                                    className="cursor-pointer gap-2"
                                    onClick={() => handleDownloadProject(proj.id, proj.business_name)}
                                >
                                    <HugeiconsIcon icon={Download04Icon} strokeWidth={2} className="size-4" />
                                    Download
                                </DropdownMenuItem>
                                <Link href={`/edit?id=${proj.id}`}>
                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} className="size-4" />
                                        Edit
                                    </DropdownMenuItem>
                                </Link>
                                {/* Eksekutor Delete */}
                                <DropdownMenuItem
                                    className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                                    onClick={() => setDeleteProjectId(proj.id)}
                                >
                                    <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="size-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <CardContent className="p-3">
                        {/* Area Thumbnail */}
                        <div className="flex h-[250px] w-full items-center justify-center rounded-xl border border-border bg-muted overflow-hidden">
                            <img
                                src={`https://diligent-overpay-stingray.ngrok-free.dev/projects/${proj.folder_path}/thumbnail.jpg?t=${new Date(proj.created_at).getTime()}`}
                                alt={proj.business_name}
                                className="object-cover w-full h-full object-top transition-transform duration-300 group-hover:scale-105"
                                // Fallback mutlak: jika Playwright belum selesai memotret di latar belakang, tampilkan placeholder abu-abu
                                onError={(e) => {
                                    e.currentTarget.src = "https://placehold.co/600x400/18181b/71717a?text=Generating+Preview..."
                                }}
                            />
                        </div>

                        {/* Ekstraksi Konten Dinamis */}
                        <div className="pt-3">
                            <CardTitle className="line-clamp-1 text-base font-semibold" title={proj.business_name}>
                                {proj.business_name}
                            </CardTitle>
                            <CardDescription className="mt-1 line-clamp-2 text-sm">
                                {proj.content_data?.business_description || "Awaiting AI generation..."}
                            </CardDescription>
                            <div className="mt-2 text-xs text-muted-foreground">
                                {new Date(proj.created_at).toLocaleDateString("en-GB")}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}