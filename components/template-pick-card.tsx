"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Image01Icon } from "@hugeicons/core-free-icons"

interface Template {
    id: string
    business_name: string
    status: string
    created_at: string
    content_data: any
}

export function TemplatePickCard({
    templates,
    selectedId,
    onSelect,
    className,
    isCompact = false
}: {
    templates: Template[],
    selectedId?: string,
    onSelect?: (id: string) => void,
    className?: string,
    isCompact?: boolean
}) {
    return (
        <div className={className || "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"}>
            {templates.map((template) => (
                <Card
                    key={template.id}
                    onClick={() => onSelect?.(template.id)}
                    className={`group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 cursor-pointer ${selectedId === template.id ? 'border-primary ring-1 ring-inset ring-primary' : 'border-border hover:border-zinc-700 dark:hover:border-zinc-300 hover:border-primary/50'}`}
                >
                    <CardContent className="p-3">
                        {/* Area Thumbnail */}
                        <div className={`flex ${isCompact ? 'h-[160px]' : 'h-[250px]'} items-center justify-center rounded-xl border border-border bg-muted overflow-hidden`}>
                            <HugeiconsIcon icon={Image01Icon} strokeWidth={1.5} className="size-12 text-muted-foreground" />
                        </div>

                        {/* Ekstraksi Konten Dinamis */}
                        <div className="pt-3">
                            <CardTitle className="line-clamp-1 text-base font-semibold" title={template.business_name}>
                                {template.business_name}
                            </CardTitle>
                            <CardDescription className="mt-1 line-clamp-2 text-sm">
                                This template abc abc + abc
                            </CardDescription>
                            <div className="mt-2 text-xs text-muted-foreground">
                                9 Sections + 6 Image + bla bla
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
