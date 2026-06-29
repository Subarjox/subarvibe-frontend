import { fetchWithAuth } from "./api-client";
import { toast } from "sonner";

export const handleDownloadProject = async (projectId: string, businessName: string) => {
    const loadingToastId = toast.loading(`Mempersiapkan unduhan untuk ${businessName}...`);
    try {
        console.log(`[DOWNLOAD INIT] Memulai penyedotan arsip untuk proyek: ${projectId}`);

        // 1. Tembak rute dengan Token JWT Mutlak
        const res = await fetchWithAuth(`/project/${projectId}/download`, {
            method: "GET"
        });

        if (!res.ok) {
            toast.dismiss(loadingToastId);
            const err = await res.json();
            toast.error(`[Gagal Mengunduh] ${err.detail || "Terjadi kesalahan di peladen."}`);
            return;
        }

        // 2. [Certain] Manipulasi Biner: Ubah respons peladen menjadi gumpalan memori (Blob)
        const blob = await res.blob();

        // 3. Rekayasa URL Palsu untuk memancing fitur unduhan bawaan peramban
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;

        // Bersihkan nama bisnis dari spasi untuk nama file
        const safeName = businessName.replace(/\s+/g, '_');
        anchor.download = `${safeName}_Website.zip`;

        // Eksekusi klik gaib tanpa campur tangan pengguna
        document.body.appendChild(anchor);
        anchor.click();

        // 4. Bersihkan memori peramban
        anchor.remove();
        window.URL.revokeObjectURL(blobUrl);

        toast.dismiss(loadingToastId);
        toast.success("Download Success! Arsip berhasil diunduh.");
        console.log("[DOWNLOAD SUCCESS] Arsip berhasil diserahkan ke perangkat klien.");

    } catch (error) {
        toast.dismiss(loadingToastId);
        console.error("[FATAL DOWNLOAD ERROR]", error);
        toast.error("Terjadi masalah jaringan saat mencoba mengunduh arsip.");
    }
};
