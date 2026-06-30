"use client"

import { useState, useEffect } from "react"
import { fetchProjectColumns } from "@/lib/fetch_columns"
import { fetchWithAuth } from "@/lib/api-client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Globe02Icon, Copy01Icon, Loading03Icon, Tick01Icon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { handleDownloadProject } from "@/lib/download-project"
import { toast } from "sonner"

interface ProjectDetailDrawerProps {
    projectId: string
    trigger: React.ReactNode
}

export function ProjectDetailDrawer({ projectId, trigger }: ProjectDetailDrawerProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [projectData, setProjectData] = useState<any>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    // [Certain] State Publish — dikelola sepenuhnya di dalam drawer
    // tidak perlu setProjects dari parent karena drawer punya state lokal sendiri
    const [isPublishing, setIsPublishing] = useState(false)
    const [publicUrl, setPublicUrl] = useState<string | null>(null)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (!open || !projectId) return

        const fetchProjectDetails = async () => {
            setLoading(true)
            try {
                const data = await fetchProjectColumns(projectId)
                if (data) {
                    setProjectData(data)
                    // [Certain] Jika proyek sudah pernah di-publish sebelumnya,
                    // langsung tampilkan URL-nya tanpa harus publish ulang
                    if (data.public_url) {
                        setPublicUrl(data.public_url)
                    }
                }
            } catch (error) {
                console.error("Failed to fetch project details:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProjectDetails()
    }, [open, projectId])

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-"
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    // [Certain] Handler Publish — menyimpan URL ke state lokal drawer,
    // bukan ke state parent, karena drawer tidak punya akses ke list proyek
    const handlePublishProject = async () => {
        setIsPublishing(true)

        try {
            console.log(`[DEPLOY INIT] Melempar proyek ${projectId} ke jaringan awan Surge...`)

            const res = await fetchWithAuth(`/project/${projectId}/publish`, {
                method: "POST"
            })

            if (!res.ok) {
                const err = await res.json()
                toast.error(`Gagal publish: ${err.detail || "Terjadi kesalahan pada peladen Surge CLI."}`)
                return
            }

            const data = await res.json() // { status, message, url }

            // [Certain] Suntikkan URL ke state drawer — UI langsung update tanpa reload
            setPublicUrl(data.url)
            toast.success(`Website kamu live di: ${data.url}`)
            console.log(`[DEPLOYMENT SUCCESS] Project live di ${data.url}`)

        } catch (error) {
            console.error("[FATAL DEPLOY ERROR]", error)
            toast.error("Koneksi terputus atau peladen backend mati saat proses upload.")
        } finally {
            setIsPublishing(false)
        }
    }

    // [Certain] Copy ke clipboard dengan feedback visual 2 detik
    const handleCopyUrl = async () => {
        if (!publicUrl) return
        try {
            await navigator.clipboard.writeText(publicUrl)
            setIsCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setIsCopied(false), 2000)
        } catch {
            toast.error("Gagal menyalin link.")
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="mb-2">
                    <SheetTitle className="text-xl font-bold">Project Details</SheetTitle>
                </SheetHeader>

                {loading ? (
                    <div className="space-y-6 px-6 pb-6">
                        <div className="space-y-2">
                            <Skeleton className="h-[200px] w-full rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 px-6 pb-6">
                        {/* Area Thumbnail */}
                        {projectData?.folder_path && (
                            <div className="flex h-[200px] w-full items-center justify-center rounded-xl border border-border bg-muted overflow-hidden">
                                <img
                                    src={`https://diligent-overpay-stingray.ngrok-free.dev/projects/${projectData.folder_path}/thumbnail.jpg?t=${projectData.created_at ? new Date(projectData.created_at).getTime() : 0}`}
                                    alt={projectData.business_name || "Project Thumbnail"}
                                    className="object-cover w-full h-full object-top"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/600x400/18181b/71717a?text=Generating+Preview..."
                                    }}
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Project Name</Label>
                            <Input
                                readOnly
                                value={projectData?.business_name || "-"}
                                className="bg-muted/50 font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Last update</Label>
                            <Input
                                readOnly
                                value={formatDate(projectData?.updated_at || projectData?.created_at)}
                                className="bg-muted/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Created At</Label>
                            <Input
                                readOnly
                                value={formatDate(projectData?.created_at)}
                                className="bg-muted/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Project Description</Label>
                            <Textarea
                                readOnly
                                value={projectData?.content_data?.business_description || "-"}
                                className="min-h-[120px] resize-none bg-muted/50"
                            />
                        </div>

                        {/* ── Tombol Publish — tepat di bawah detail proyek ── */}
                        <div className="space-y-3 pt-2 border-t border-border/50">
                            <Button
                                className="w-full h-10 gap-2 font-semibold"
                                onClick={handlePublishProject}
                                disabled={isPublishing}
                            >
                                {isPublishing ? (
                                    <>
                                        <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <HugeiconsIcon icon={Globe02Icon} className="size-4" />
                                        {publicUrl ? "Re-publish" : "Publish"}
                                    </>
                                )}
                            </Button>

                            {/* [Certain] Tampilkan URL hanya setelah website berhasil live */}
                            {publicUrl && (
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-muted-foreground font-medium">
                                        Live URL
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            readOnly
                                            value={publicUrl}
                                            className="bg-muted/50 text-sm font-mono text-primary h-9"
                                        />
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-9 w-9 shrink-0"
                                            onClick={handleCopyUrl}
                                            title="Copy link"
                                        >
                                            <HugeiconsIcon
                                                icon={isCopied ? Tick01Icon : Copy01Icon}
                                                className={`size-4 transition-colors ${isCopied ? "text-primary" : ""}`}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Tombol sekunder tetap di footer bawah ── */}
                <SheetFooter className="px-6 pb-6 pt-2">
                    <Button
                        className="w-full h-9"
                        variant="outline"
                        onClick={() => handleDownloadProject(projectId, projectData?.business_name || "Project")}
                    >
                        Download Project
                    </Button>
                    <Button className="w-full h-9" variant="destructive" onClick={() => setDeleteOpen(true)}>
                        Delete Project
                    </Button>
                    <DeleteProjectDialog
                        open={deleteOpen}
                        onOpenChange={setDeleteOpen}
                        projectId={projectId}
                        onDeleted={() => setOpen(false)}
                    />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
