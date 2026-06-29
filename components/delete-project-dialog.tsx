"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { fetchWithAuth } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DeleteProjectDialog({
    open,
    onOpenChange,
    projectId,
    onDeleted
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    projectId: string | null
    onDeleted?: (id: string) => void
}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDeleteProject = async () => {
        if (!projectId) return

        setIsDeleting(true)
        try {
            // [Certain] Gunakan mekanisme fetchWithAuth untuk membawa Supabase JWT
            const res = await fetchWithAuth(`/project/${projectId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const err = await res.json();
                const errorMessage = typeof err.detail === 'object'
                    ? JSON.stringify(err.detail)
                    : err.detail;
                toast.error(`[Gagal Menghapus] ${errorMessage || "Terjadi kesalahan di peladen."}`);
                setIsDeleting(false)
                return;
            }

            console.log(`[CLEANUP] Proyek ${projectId} berhasil dihancurkan dari UI.`);
            toast.success("Delete Success! Proyek berhasil dihapus.");

            onOpenChange(false)
            if (onDeleted) {
                onDeleted(projectId)
            }
            // Minta App Router me-refresh data (re-fetch dari Server Components)
            router.refresh()
        } catch (error) {
            console.error("[FATAL DELETE ERROR]", error);
            toast.error("Terjadi masalah jaringan atau peladen gagal merespons. Periksa koneksi.");
        }
        setIsDeleting(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete project?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this project? This action is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteProject} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Project"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
