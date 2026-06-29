"use client"

import { useState, useEffect } from "react"
import { fetchProjectColumns } from "@/lib/fetch_columns"
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
import Link from "next/link"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { handleDownloadProject } from "@/lib/download-project"

interface ProjectDetailDrawerProps {
    projectId: string
    trigger: React.ReactNode
}

export function ProjectDetailDrawer({ projectId, trigger }: ProjectDetailDrawerProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [projectData, setProjectData] = useState<any>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    useEffect(() => {
        if (!open || !projectId) return

        const fetchProjectDetails = async () => {
            setLoading(true)
            try {
                const data = await fetchProjectColumns(projectId)
                if (data) {
                    setProjectData(data)
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
                    </div>
                )}

                <SheetFooter className="px-6 pb-6 pt-2">
                    <Link href={`/edit?id=${projectId}`} className="w-full">
                        <Button className="w-full h-9" variant="default">
                            Edit Project Data
                        </Button>
                    </Link>
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
