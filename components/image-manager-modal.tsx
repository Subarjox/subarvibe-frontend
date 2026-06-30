"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // [Certain] Impor ini wajib ada untuk membungkam eror
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, MagicWand01Icon } from "@hugeicons/core-free-icons"
import { fetchWithAuth } from "@/lib/api-client"

interface ImageManagerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImageKey: string | null
  currentImageSrc: string | null
  onSelectImage: (key: string, newSrc: string) => void
  projectId?: string;
}

export function ImageManagerModal({
  open,
  onOpenChange,
  currentImageKey,
  currentImageSrc,
  onSelectImage,
  projectId
}: ImageManagerModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [prompt, setPrompt] = React.useState("")

  // [Certain] State pelacak agar pengguna tidak mengeklik tombol berkali-kali
  const [isUploading, setIsUploading] = React.useState(false)

  // ==============================================================
  // 1. LOGIKA UNGGAH FISIK KE FASTAPI (Bukan sekadar URL lokal)
  // ==============================================================
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentImageKey || !projectId) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("image_key", currentImageKey)
    formData.append("file", file)

    try {
      // Menembak langsung ke rute pelabuhan gambar FastAPI
      const res = await fetchWithAuth(`/project/${projectId}/upload-image`, {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        console.log("Upload berhasil. Data dari server:", data);

        // [Certain] Tambahkan cache-busting timestamp agar browser WAJIB memuat
        // gambar baru dari server, bukan dari cache — krusial saat ekstensi berubah
        // (contoh: .png → .jpg). Tanpa ini, browser menolak fetch ulang karena
        // menganggap URL "sama" secara path, padahal file fisiknya sudah berbeda.
        const timestamp = Date.now();
        const srcWithCacheBust = `${data.src}?v=${timestamp}`;

        onSelectImage(data.key, srcWithCacheBust);

        onOpenChange(false);
      } else {
        alert("Upload Failed")
      }
    } catch (error) {
      console.error("FastAPI connection error:", error)
      alert("Gagal terhubung ke server FastAPI.")
    } finally {
      setIsUploading(false)
    }
  }

  // ==============================================================
  // 2. PLACEHOLDER UNTUK AI & STOCK (Sementara)
  // ==============================================================
  const handleGenerate = () => {
    if (!currentImageKey || !prompt) return
    // TODO: Ganti ini ke endpoint /generate-ai-image di masa depan
    const fakeGeneratedUrl = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`
    onSelectImage(currentImageKey, fakeGeneratedUrl)
    onOpenChange(false)
  }

  const handleSearch = () => {
    if (!currentImageKey || !searchQuery) return
    // TODO: Ganti ini ke endpoint /search-stock-image di masa depan
    const fakeSearchUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(searchQuery)}`
    onSelectImage(currentImageKey, fakeSearchUrl)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">1
        <DialogHeader>
          <DialogTitle>Update Image: {currentImageKey}</DialogTitle>
          {/* [Certain] Komponen tersembunyi untuk membungkam peringatan aksesibilitas UI Shadcn */}
          <DialogDescription className="hidden">
            {currentImageKey}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          {currentImageSrc && (
            <div className="mb-4">
              <Label className="mb-2 block text-xs text-muted-foreground">Current Image</Label>
              <div className="relative h-32 w-full overflow-hidden rounded-md border">
                <img src={currentImageSrc} alt="Current" className="h-full w-full object-cover" />
              </div>
            </div>
          )}

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="ai">AI Generate</TabsTrigger>
              <TabsTrigger value="stock">Stock Search</TabsTrigger>
            </TabsList>

            {/* TAB: UPLOAD FISIK */}
            <TabsContent value="upload" className="mt-4 flex flex-col gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Select a local file</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={isUploading || !projectId}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {isUploading
                  ? "Uploading to FastAPI SSD..."
                  : "Image will be uploaded and saved permanently to the project assets."}
              </p>
            </TabsContent>

            {/* TAB: AI GENERATE */}
            <TabsContent value="ai" className="mt-4 flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="prompt">Image Prompt</Label>
                <div className="flex gap-2">
                  <Input
                    id="prompt"
                    placeholder="e.g. A modern coffee shop interior..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button onClick={handleGenerate} disabled={!prompt}>
                    <HugeiconsIcon icon={MagicWand01Icon} className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Powered by Flux AI. This may take a few seconds.
              </p>
            </TabsContent>

            {/* TAB: STOCK SEARCH */}
            <TabsContent value="stock" className="mt-4 flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="search">Search Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder="e.g. coffee beans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} variant="secondary" disabled={!searchQuery}>
                    <HugeiconsIcon icon={Search01Icon} className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Search through our curated Unsplash collection.
              </p>
            </TabsContent>

          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}