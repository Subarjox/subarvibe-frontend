"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import { fetchWithAuth } from "@/lib/api-client"
interface CreateDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}


export function CreateDialog({
    open,
    onOpenChange,
}: CreateDialogProps) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [businessName, setBusinessName] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessEmail, setBusinessEmail] = useState("")
    const [businessPhone, setBusinessPhone] = useState("")
    const [businessDescription, setBusinessDescription] = useState("")
    const [imageGenMethod, setImageGenMethod] = useState("placeholder")

    const isFormValid =
        businessName.trim() !== "" &&
        businessAddress.trim() !== "" &&
        businessEmail.trim() !== "" &&
        businessPhone.trim() !== "" &&
        businessDescription.trim() !== "" &&
        imageGenMethod.trim() !== ""

    const handleSubmit = async () => {
        console.log("SUBMIT CLICKED")
        if (!isFormValid) return

        try {
            setLoading(true)

            const payload = {
                business_name: businessName,
                business_address: businessAddress,
                business_email: businessEmail,
                business_phone: businessPhone,
                business_description: businessDescription,
                image_method: imageGenMethod,
            }

            console.log("Mengirim payload berotentikasi:", payload)

            // [Certain] Eksekusi tembakan ke FastAPI menggunakan pelindung JWT
            // Kamu tidak perlu lagi menulis URL Ngrok atau Header secara manual, semua sudah diurus apiClient
            const response = await fetchWithAuth("/generate", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                console.log("[NEXT.JS] Proyek berhasil diantrekan:", data);

                // [Likely] Tutup dialog
                onOpenChange(false);

                // [Certain] Paksa Next.js menyegarkan memori rute agar saat klien kembali ke Dasbor, proyek baru ini langsung muncul
                router.refresh();

                // Lompat ke halaman Preview
                router.push(`/preview?id=${data.project_id}`);
            } else {
                console.error("Gagal membuat project, peladen menolak:", data);
                // Opsi: Tambahkan setErrorMsg di sini jika kamu ingin menampilkan eror API ke pengguna
            }
        } catch (error) {
            console.error("Gagal terhubung ke FastAPI:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>
                        Create New Project
                    </DialogTitle>

                    <DialogDescription>
                        Describe your business and project needs.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-4">

                    {/* Business Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Business Name
                        </label>

                        <Input
                            className="h-10"
                            value={businessName}
                            onChange={(e) =>
                                setBusinessName(e.target.value)
                            }
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Business Address
                            </label>

                            <Textarea
                                className="min-h-[120px]"
                                value={businessAddress}
                                onChange={(e) =>
                                    setBusinessAddress(
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-4">

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Business Email
                                </label>

                                <Input
                                    className="h-10"
                                    value={businessEmail}
                                    onChange={(e) =>
                                        setBusinessEmail(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Business Phone
                                </label>

                                <Input
                                    className="h-10"
                                    value={businessPhone}
                                    onChange={(e) =>
                                        setBusinessPhone(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Business Description
                        </label>

                        <Textarea
                            className="min-h-[120px]"
                            value={businessDescription}
                            onChange={(e) =>
                                setBusinessDescription(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    {/* Image Generation Method */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Image Generation Method
                        </label>

                        <Select
                            value={imageGenMethod}
                            onValueChange={setImageGenMethod}
                        >
                            <SelectTrigger className="w-full mt-2 !h-10">
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>

                            <SelectContent>
                                <TooltipProvider>
                                    <div className="flex items-center justify-between w-full">
                                        <SelectItem value="placeholder_img">
                                            Placeholder Images
                                        </SelectItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="max-w-[220px]">
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    <div className="mb-2 text-s">Uses generic placeholder images as temporary visuals. Fast and lightweight.</div>
                                                    Generate time ≈ 1 min
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <SelectItem value="stock_img">
                                            Stock Image
                                        </SelectItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="max-w-[220px]">
                                                <p>Fetches relevant stock photos from online libraries. Good quality with real imagery.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <SelectItem value="ai_img">
                                            AI Generated Image
                                        </SelectItem>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="max-w-[220px]">
                                                <p>Generates unique images using AI based on your business context. Most customized results.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TooltipProvider>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <Button
                            className="min-w-[140px] transition-all duration-300"
                            onClick={handleSubmit}
                            disabled={loading || !isFormValid}
                        >
                            {loading ? "Generating..." : "Create Project"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}