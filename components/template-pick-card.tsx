"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

// [Certain] Antarmuka ini HARUS identik dengan apa yang dikirimkan oleh komponen Parent (hasil RAG)
export interface TemplateDisplay {
    template_id: string
    name: string
    description: string
    preview_image_url: string
}

export function TemplatePickCard({
    templates,
    selectedId,
    onSelect,
    className,
    isCompact = false
}: {
    templates: TemplateDisplay[], // [Certain] Gunakan interface baru yang sinkron
    selectedId?: string,
    onSelect?: (id: string) => void,
    className?: string,
    isCompact?: boolean
}) {
    return (
        <div className={className || "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"}>
            {templates.map((template) => (
                <Card
                    key={template.template_id}
                    onClick={() => onSelect?.(template.template_id)}
                    className={`group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 cursor-pointer ${selectedId === template.template_id
                        ? 'border-primary ring-1 ring-inset ring-primary'
                        : 'border-border hover:border-zinc-700 dark:hover:border-zinc-300 hover:border-primary/50'
                        }`}
                >
                    <CardContent className="p-3">
                        {/* [Certain] Area Thumbnail Asli dari Mesin Playwright */}
                        <div className={`flex ${isCompact ? 'h-[160px]' : 'h-[250px]'} items-center justify-center rounded-xl border border-border bg-muted overflow-hidden relative`}>
                            <img
                                src={template.preview_image_url}
                                alt={`Cover of ${template.name}`}
                                className="object-cover w-full h-full object-top transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    // Fallback jika gambar cover_template.jpg belum digenerate oleh Python
                                    e.currentTarget.src = "https://placehold.co/600x400/18181b/71717a?text=No+Cover"
                                }}
                            />

                            {/* Lapisan gradien tipis untuk estetika */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* [Likely] Ekstraksi Konten Dinamis RAG */}
                        <div className="pt-3">
                            <CardTitle className="line-clamp-1 text-base font-semibold" title={template.name}>
                                {template.name}
                            </CardTitle>
                            <CardDescription className="mt-1 line-clamp-2 text-sm min-h-[40px]">
                                {template.description}
                            </CardDescription>

                            {/* Anda bisa memodifikasi atau menghapus badge section ini karena deskripsi RAG sudah cukup panjang */}
                            <div className="mt-3 text-[11px] font-medium tracking-wider text-primary uppercase bg-primary/10 inline-block px-2 py-1 rounded-md">
                                AI Optimized
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}