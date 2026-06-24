"use client"

import { useState } from "react"
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
import { TemplatePickCard } from "@/components/template-pick-card"

const DUMMY_TEMPLATES = [
    { id: '1', business_name: 'Neon_Dark_V3', content_data: { business_description: 'This template is highly optimized for modern businesses.' }, status: 'ready', created_at: new Date().toISOString() },
    { id: '2', business_name: 'Minimalist_White', content_data: { business_description: 'Clean and elegant design focusing on typography.' }, status: 'ready', created_at: new Date().toISOString() },
    { id: '3', business_name: 'Cyberpunk_Glow', content_data: { business_description: 'Futuristic and vibrant aesthetic for tech companies.' }, status: 'ready', created_at: new Date().toISOString() }
];

export function CreateCarousel() {
    const [businessName, setBusinessName] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessEmail, setBusinessEmail] = useState("")
    const [businessPhone, setBusinessPhone] = useState("")
    const [businessDescription, setBusinessDescription] = useState("")
    const [imageGenMethod, setImageGenMethod] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3

    return (
        <div className="relative w-full max-w-[1500px] rounded-2xl border border-border bg-[#0a0a0a] p-4 md:p-12 min-h-[700px] flex flex-col">

            {/* Header Form */}
            <div className="relative mb-8">
                {/* Centered Step Indicator */}
                <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none">
                    <div className="text-lg font-semibold tracking-widest text-primary">
                        Step <span className="text-primary">{currentStep}</span> of <span className="text-primary">{totalSteps}</span>
                    </div>
                </div>
                <div className="flex justify-end pt-8 mt-10 border-t border-border/50"></div>

                {/* Title (left aligned) */}
                <div>
                    {currentStep === 1 && (
                        <>
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Create a new website</h2>
                            <p className="text-muted-foreground text-sm font-semibold">
                                Describe your business for your website
                            </p>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Pick Your template</h2>
                            <p className="text-muted-foreground text-sm font-semibold">
                                Choose the most suitable template for you
                            </p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Confirmation</h2>
                            <p className="text-muted-foreground text-sm font-semibold">
                                Review your project details
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 relative overflow-hidden -m-2 p-2">
                <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out h-full items-center"
                    style={{ transform: `translateX(calc(-${(currentStep - 1) * 100}% - ${(currentStep - 1)}rem))` }}
                >
                    {/* Step 1 */}
                    <div className="w-full shrink-0 space-y-6">
                        {/* Business Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Business Name
                            </label>
                            <Input
                                className="h-12 bg-muted/20 border-input"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </div>

                        {/* Address, Email, Phone Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Business Address
                                </label>
                                <Textarea
                                    className="min-h-[148px] bg-muted/20 border-input resize-none"
                                    value={businessAddress}
                                    onChange={(e) => setBusinessAddress(e.target.value)}
                                />
                            </div>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Business Email
                                    </label>
                                    <Input
                                        className="h-12 bg-muted/20 border-input"
                                        type="email"
                                        value={businessEmail}
                                        onChange={(e) => setBusinessEmail(e.target.value)}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Business Phone
                                    </label>
                                    <Input
                                        className="h-12 bg-muted/20 border-input"
                                        type="tel"
                                        value={businessPhone}
                                        onChange={(e) => setBusinessPhone(e.target.value)}
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
                                className="min-h-[120px] bg-muted/20 border-input"
                                value={businessDescription}
                                onChange={(e) => setBusinessDescription(e.target.value)}
                            />
                        </div>

                        {/* Image Generation Method */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Image Generation Method
                            </label>
                            <Select value={imageGenMethod} onValueChange={setImageGenMethod}>
                                <SelectTrigger className="w-full h-12 bg-muted/20 border-input !h-12">
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
                    </div>

                    {/* Step 2 */}
                    <div className="w-full shrink-0 pt-4">
                        <TemplatePickCard
                            templates={DUMMY_TEMPLATES}
                            selectedId={selectedTemplate || undefined}
                            onSelect={(id) => setSelectedTemplate(id)}
                        />
                    </div>

                    {/* Step 3 (Confirmation) */}
                    <div className="w-full shrink-0">
                        <div className="rounded-xl border border-border bg-muted/10 p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-foreground mb-4">Business Information</h3>
                                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold">{businessName || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold">{businessEmail || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold">{businessPhone || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold line-clamp-2">{businessAddress || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold line-clamp-2">{businessDescription || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">Image Gen Method</dt>
                                        <dd className="mt-1 text-sm text-foreground font-semibold line-clamp-1">{imageGenMethod || "-"}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="pt-6 border-t border-border/50">
                                <h3 className="text-lg font-medium text-foreground mb-4">Selected Template</h3>
                                <div className="flex justify-center max-w-sm mx-auto">
                                    {selectedTemplate ? (
                                        <div className="w-full pointer-events-none">
                                            <TemplatePickCard
                                                templates={DUMMY_TEMPLATES.filter(t => t.id === selectedTemplate)}
                                                selectedId={selectedTemplate}
                                                className="grid grid-cols-1 w-full"
                                                isCompact={true}
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center">No template selected.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer / Navigasi Carousel */}
            <div className="flex justify-end pt-8 mt-8 border-t border-border/50">
                {currentStep === 1 && (
                    <Button
                        size="lg"
                        className="min-h-[50px] min-w-[180px] text-sm text-primary-foreground font-semibold"
                        onClick={() => setCurrentStep(2)}
                    >
                        Next
                    </Button>
                )}
                {currentStep === 2 && (
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="min-h-[50px] min-w-[180px] text-sm font-semibold text-foreground border-border hover:bg-muted"
                            onClick={() => setCurrentStep(1)}
                        >
                            Back
                        </Button>
                        <Button
                            size="lg"
                            className="min-h-[50px] min-w-[180px] text-sm text-primary-foreground font-semibold"
                            onClick={() => setCurrentStep(3)}
                        >
                            Next
                        </Button>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="min-h-[50px] min-w-[180px] text-sm font-semibold text-foreground border-border hover:bg-muted"
                            onClick={() => setCurrentStep(2)}
                        >
                            Back
                        </Button>
                        <Button
                            size="lg"
                            className="min-h-[50px] min-w-[180px] text-sm text-primary-foreground font-semibold"
                            onClick={() => console.log('Submit')}
                        >
                            Create Project
                        </Button>
                    </div>
                )}
            </div>

        </div>
    )
}
