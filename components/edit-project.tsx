"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ImageManagerModal } from "./image-manager-modal"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { fetchWithAuth } from "@/lib/api-client" // [Certain] Injeksi Klien Berotentikasi
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ProjectData {
    template_id: string;
    content: Record<string, string>;
    images: Record<string, string>;
    theme?: string;
}

export default function EditProjectPage() {
    // 1. Ambil ID dari URL (Ini adalah UUID dari Database)
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    // 2. Project Data State
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [folderPath, setFolderPath] = useState<string | null>(null);
    const [isLoadingInit, setIsLoadingInit] = useState(true);

    // 3. UI State
    const [changed, setChanged] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [currentImageKey, setCurrentImageKey] = useState<string | null>(null)
    const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null)
    const [iframeRefreshKey, setIframeRefreshKey] = useState(0)

    const iframeRef = useRef<HTMLIFrameElement>(null)

    // 5a. Injeksi style pointer-events ke dalam iframe setiap kali iframe selesai load
    const injectEditorStyles = () => {
        const iframeDoc = iframeRef.current?.contentDocument;
        if (!iframeDoc || !iframeDoc.head) return;

        const style = iframeDoc.createElement('style');
        style.innerHTML = `
            /* 1. Lumpuhkan SELURUH div pembungkus transparan agar kursor tembus ke belakang */
            .container, .row, .col, .wrapper, .text-center {
                pointer-events: none !important;
            }

            /* 2. Kembalikan nyawa interaksi HANYA pada elemen yang terlihat (Teks & Tombol) */
            h1, h2, h3, h4, h5, h6, p, span, a, button, input {
                pointer-events: auto !important;
                position: relative !important;
                z-index: 10000 !important;
            }

            /* 3. Pastikan elemen latar belakang (yang punya data-bg-key) bisa diklik */
            [data-bg-key], img {
                pointer-events: auto !important;
                cursor: pointer !important;
                position: relative !important;
                z-index: 10 !important;
            }
        `;
        iframeDoc.head.appendChild(style);
    }

    // 4. Tarik Translasi Folder dan Data JSON Asli
    useEffect(() => {
        if (!projectId) return;

        const initializeEditor = async () => {
            setIsLoadingInit(true);
            try {
                // A. Translasi UUID ke Folder Path menembus Supabase
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
                const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
                const supabase = createBrowserClient(supabaseUrl, supabaseKey);

                const { data: dbData, error: dbError } = await supabase
                    .from("projects")
                    .select("folder_path")
                    .eq("id", projectId)
                    .single();

                if (dbError || !dbData) {
                    console.error("Proyek tidak ditemukan di Database:", dbError);
                    setIsLoadingInit(false);
                    return;
                }

                const actualFolderPath = dbData.folder_path;
                setFolderPath(actualFolderPath);

                // B. Sedot Source of Truth dari folder statis FastAPI menggunakan NAMA FOLDER ASLI
                const timestamp = new Date().getTime();
                const res = await fetch(`https://diligent-overpay-stingray.ngrok-free.dev/projects/${actualFolderPath}/data.json?t=${timestamp}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProjectData({
                        template_id: data.template_id || "unknown",
                        content: data.placeholders || {},
                        images: data.images || {},
                        theme: "default"
                    });
                } else {
                    console.error("Gagal menarik data.json. Peladen menolak permintaan.");
                }
            } catch (error) {
                console.error("Error selama inisialisasi:", error);
            } finally {
                setIsLoadingInit(false);
            }
        };

        initializeEditor();
    }, [projectId]);

    // 5. Dengarkan ketikan dari Iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data = event.data

            if (!data || typeof data !== "object") return

            switch (data.action) {
                case "UPDATE_DATA":
                    if (data.key && typeof data.value !== "undefined") {
                        setProjectData(prev => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                content: {
                                    ...prev.content,
                                    [data.key]: data.value
                                }
                            }
                        })
                        setChanged(true)
                    }
                    break

                case "OPEN_IMAGE_MODAL":
                    if (data.key) {
                        setCurrentImageKey(data.key)
                        let rawSrc = data.currentSrc || "";

                        // [Certain] Perbaikan URL gambar di Modal menggunakan folderPath
                        if (rawSrc && !rawSrc.startsWith("http") && folderPath) {
                            rawSrc = `https://diligent-overpay-stingray.ngrok-free.dev/projects/${folderPath}/${rawSrc}`;
                        }
                        setCurrentImageSrc(rawSrc)
                        setIsImageModalOpen(true)
                    }
                    break
            }
        }

        window.addEventListener("message", handleMessage)
        return () => window.removeEventListener("message", handleMessage)

    }, [folderPath]) // folderPath masuk ke array dependensi agar selalu baru

    // 6. Tangani pemilihan gambar dari Modal
    const handleSelectImage = async (key: string, newSrc: string) => {
        // [Certain] Bangun objek gambar terbaru terlebih dahulu SEBELUM update state,
        // karena setState bersifat asinkron — jika langsung baca state setelah set,
        // nilainya belum tentu yang terbaru saat executeSaveImages dipanggil.
        const updatedImages = {
            ...(projectData?.images || {}),
            [key]: newSrc
        };

        setProjectData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                images: updatedImages
            }
        })
        setChanged(true)

        // Perbarui visual Iframe secara instan
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                action: "UPDATE_IMAGE",
                key: key,
                src: newSrc
            }, "*")
        }

        // [Certain] Auto-save ke backend setelah upload gambar selesai.
        // Tanpa ini, jika ekstensi berubah (contoh: .png → .jpg), database Supabase
        // masih menyimpan path lama. Saat user refresh, iframe akan load gambar lama.
        // Tidak perlu dialog konfirmasi — user sudah mengkonfirmasi via aksi upload.
        if (projectId && projectData) {
            try {
                const res = await fetchWithAuth(`/project/${projectId}/update`, {
                    method: "PUT",
                    body: JSON.stringify({
                        template_id: projectData.template_id,
                        content: projectData.content,
                        images: updatedImages,
                        theme: projectData.theme
                    })
                });

                if (res.ok) {
                    console.log("[AUTO-SAVE] Ekstensi gambar berhasil disinkronisasi ke database.");
                    toast.success("Image updated and saved.");
                    setChanged(false);
                    setIframeRefreshKey(Date.now());
                } else {
                    // Gagal auto-save — tidak fatal, user masih bisa manual save
                    console.warn("[AUTO-SAVE] Gagal sinkronisasi ke backend. User perlu manual save.");
                    toast.warning("Image updated locally. Don't forget to save your project.");
                }
            } catch (error) {
                console.warn("[AUTO-SAVE] Koneksi terputus saat auto-save:", error);
                toast.warning("Image updated locally. Don't forget to save your project.");
            }
        }
    }

    // 7. Jembatan Simpan ke FastAPI
    const handleSave = () => {
        setIsSaveDialogOpen(true);
    }

    const executeSave = async () => {
        if (!projectId || !projectData) return;

        setIsSaving(true);
        console.log("Mencoba menyimpan project UUID:", projectId);

        try {
            // [Certain] Bantai fetch telanjang, gunakan fetchWithAuth!
            const res = await fetchWithAuth(`/project/${projectId}/update`, {
                method: "PUT",
                body: JSON.stringify({
                    template_id: projectData.template_id,
                    content: projectData.content,
                    images: projectData.images,
                    theme: projectData.theme
                })
            });

            if (res.ok) {
                const result = await res.json();
                console.log("Update Berhasil", result);
                toast.success("Edit Success! Project saved successfully.");
                setChanged(false);
                setIsSaveDialogOpen(false);
                setIframeRefreshKey(Date.now());
            } else {
                const err = await res.json();
                toast.error(`Gagal menyimpan: ${err.detail || "Error backend"}`);
            }
        } catch (error) {
            console.error("Gagal menghubungi backend", error);
            toast.error("Gagal menghubungi backend.");
        } finally {
            setIsSaving(false);
        }
    }

    // 8. Perlindungan Anti-Render
    if (!projectId || isLoadingInit) {
        return (
            <div className="flex h-full items-center justify-center bg-background text-muted-foreground text-sm font-medium animate-pulse">
                Menginisialisasi Mesin Editor...
            </div>
        )
    }

    if (!folderPath) {
        return (
            <div className="flex h-full items-center justify-center bg-background text-destructive text-sm font-medium">
                Gagal memuat proyek. Data hilang dari pangkalan data.
            </div>
        )
    }

    // [Certain] URL Iframe Dinamis dan Absolut menggunakan FOLDER PATH!
    const iframeUrl = `https://diligent-overpay-stingray.ngrok-free.dev/projects/${folderPath}/index.html?mode=edit&t=${iframeRefreshKey}`;

    return (
        <div className="flex h-full flex-col">
            {/* Topbar */}
            <div className="relative flex h-[var(--header-height)] shrink-0 items-center justify-between border-b px-4">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="-ms-1 text-muted-foreground hover:text-foreground" />
                    <h1 className="text-sm font-semibold text-foreground truncate max-w-[200px]" title={projectId}>
                        {folderPath}
                    </h1>
                </div>

                {/* Center */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
                    <h1 className="text-sm font-semibold text-foreground">
                        Edit Mode
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
                                <div className="text-xs font-medium">Click any text or any images on your website to edit it. Some of the image cant be clicked, click the change image button to change it</div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Right */}
                <div className="flex items-center gap-5">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="text-sm font-medium hover:opacity-80 hover:underline text-sky-500">
                                Change Image
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto bg-card p-6 border-l border-border">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-xl font-bold">Manajemen Gambar</SheetTitle>
                                <p className="text-xs text-muted-foreground mt-1">Daftar ini ditarik langsung secara dinamis dari Source of Truth</p>
                            </SheetHeader>

                            {/* [Certain] Render form HANYA jika projectData dan properti images tersedia */}
                            {projectData && projectData.images && Object.keys(projectData.images).length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-4">
                                        {Object.entries(projectData.images).map(([key, value]) => (
                                            <div key={key} className="p-4 rounded-xl border border-border bg-muted/30 flex flex-col gap-3">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                                                    {key.replace(/-/g, ' ')}
                                                </label>
                                                <div className="flex flex-col gap-3">
                                                    <img
                                                        src={value && !value.startsWith("http") && folderPath ? `https://diligent-overpay-stingray.ngrok-free.dev/projects/${folderPath}/${value}?v=${iframeRefreshKey}` : `${value}?v=${iframeRefreshKey}`}
                                                        alt={key}
                                                        className="w-full h-32 rounded-lg object-cover border border-border bg-neutral-800 shrink-0"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full text-xs font-semibold bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border-0"
                                                        onClick={() => {
                                                            setCurrentImageKey(key);
                                                            let rawSrc = value || "";
                                                            if (rawSrc && !rawSrc.startsWith("http") && folderPath) {
                                                                rawSrc = `https://diligent-overpay-stingray.ngrok-free.dev/projects/${folderPath}/${rawSrc}`;
                                                            }
                                                            setCurrentImageSrc(rawSrc);
                                                            setIsImageModalOpen(true);
                                                        }}
                                                    >
                                                        Ubah Gambar
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-sm text-muted-foreground">
                                    ⚠️ Tidak ada data gambar yang ditemukan di dalam data.json proyek ini.
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>

                    <Button
                        disabled={!changed || isSaving || !projectData}
                        onClick={handleSave}
                        className="rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 h-8"
                    >
                        {isSaving ? "Menyimpan..." : "Save"}
                    </Button>
                </div>
            </div>

            {/* Main Container */}
            <div className="mx-4 mb-4 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                {/* Iframe Area */}
                <div className="relative flex h-full w-full flex-1 items-center justify-center bg-card">
                    <iframe
                        ref={iframeRef}
                        src={iframeUrl}
                        className="absolute inset-0 h-full w-full border-0 bg-white"
                        title="Website Editor"
                        onLoad={injectEditorStyles}
                    />
                </div>
            </div>

            <ImageManagerModal
                open={isImageModalOpen}
                onOpenChange={setIsImageModalOpen}
                currentImageKey={currentImageKey}
                currentImageSrc={currentImageSrc}
                onSelectImage={handleSelectImage}
                projectId={projectId}
            />

            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to save changes? Your website will be updated immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button onClick={executeSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}