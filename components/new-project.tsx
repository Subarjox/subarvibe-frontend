"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"

const progressData = [
    { id: 1, header: "Understanding your business", type: "Analysis", status: "Done" },
    { id: 2, header: "Picking Your template", type: "Selection", status: "Done" },
    { id: 3, header: "Generating Content", type: "Content", status: "In Process" },
    { id: 4, header: "Generating Images", type: "Media", status: "In Process" },
    { id: 5, header: "Finishing", type: "Finalization", status: "In Process" },
]

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import { CreateDialog } from "@/components/create-dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Progress } from "@/components/ui/progress"

import { HugeiconsIcon } from "@hugeicons/react"

import {
    CheckmarkCircle02Icon,
    Loading03Icon,
    ArrowDown01Icon,
    TaskDone01Icon,
    Circle
} from "@hugeicons/core-free-icons"

export default function NewProjectPage() {
    const [open, setOpen] = useState(true)
    const [businessName, setBusinessName] = useState("qweqweqweqweqwe")
    const [businessAddress, setBusinessAddress] = useState(
        "qweqweqweqweqwe asdad asd asdad ad asd asdasd asd as"
    )
    const [businessEmail, setBusinessEmail] = useState(
        "qweqweqweqwe"
    )
    const [businessPhone, setBusinessPhone] = useState(
        "qweqweqweqwe"
    )
    const [businessDescription, setBusinessDescription] = useState(
        "qweqweqweqweqwe"
    )

    const isDescribeDone =
        businessName &&
        businessAddress &&
        businessEmail &&
        businessPhone &&
        businessDescription

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Progress */}
            <div className="space-y-6">
                <div>
                    <h2 className="mb-20 text-xl font-semibold">
                        Progress :
                    </h2>

                    <div className="relative px-8">

                        {/* Line */}
                        <div className="absolute left-0 top-[10px] h-[4px] w-full bg-muted" />

                        <div className="absolute left-0 top-[10px] h-[4px] w-1/2 bg-primary transition-all" />

                        {/* Steps */}
                        <div className="relative z-10 flex items-center justify-between">

                            {/* Step 1 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                    <HugeiconsIcon
                                        icon={CheckmarkCircle02Icon}
                                        strokeWidth={2}
                                        className="size-6"
                                    />
                                </div>

                                <p className="text-xs font-medium">
                                    Describe your needs
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background">
                                    <HugeiconsIcon
                                        icon={Loading03Icon}
                                        strokeWidth={2}
                                        className="size-4 animate-spin"
                                    />
                                </div>

                                <p className="text-xs font-medium">
                                    Generating your content
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-4 w-4 items-center justify-center rounded-full bg-muted" />

                                <p className="text-xs font-medium">
                                    Your project are ready!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        className="min-w-[200px] min-h-[40px] rounded rounded-xl "
                        onClick={() => setOpen(true)}>
                        Create your Project
                    </Button>

                    <CreateDialog
                        open={open}
                        onOpenChange={setOpen}
                    />
                </div>

                {/* Detail */}
                <div>
                    <h2 className="mt-20 mb-15 text-xl font-semibold">
                        Details :
                    </h2>

                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="describe"
                        className="space-y-4 p-3"
                    >

                        {/* Describe */}
                        <AccordionItem
                            value="describe"
                            className="overflow-hidden rounded-lg border"
                        >
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex w-full items-center justify-between pr-4">

                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-medium">
                                            Describe your needs
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="text-xs text-muted-foreground">
                                            Done
                                        </span>

                                        <HugeiconsIcon
                                            icon={CheckmarkCircle02Icon}
                                            strokeWidth={2}
                                            className="size-5 text-primary"
                                        />
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-5 pb-5">
                                <div className="space-y-4">

                                    {/* Business Name */}
                                    <div className="space-y-2">
                                        <label className="text-s font-medium">
                                            Business Name
                                        </label>

                                        <Input
                                            value={businessName}
                                            className="rounded rounded-l min-h-[40px]"
                                            onChange={(e) =>
                                                setBusinessName(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Grid */}
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                                        {/* Address */}
                                        <div className="space-y-2">
                                            <label className="text-s font-medium">
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
                                            <div className="space-y-2 ">
                                                <label className="text-s font-medium">
                                                    Business Email
                                                </label>

                                                <Input
                                                    className="rounded rounded-l min-h-[40px]"
                                                    value={businessEmail}
                                                    onChange={(e) =>
                                                        setBusinessAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className="space-y-2">
                                                <label className="text-s font-medium">
                                                    Business Phone
                                                </label>

                                                <Input
                                                    className="rounded rounded-l min-h-[40px]"
                                                    value={businessPhone}
                                                    onChange={(e) =>
                                                        setBusinessAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="text-s font-medium">
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
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Generating */}
                        <AccordionItem
                            value="generating"
                            className="overflow-hidden rounded-lg border"
                        >
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex w-full items-center justify-between pr-4">

                                    <p className="text-sm font-medium">
                                        Generating Your Content
                                    </p>

                                    <div className="flex items-center gap-3">

                                        <span className="text-xs text-muted-foreground">
                                            On - Progress
                                        </span>

                                        <HugeiconsIcon
                                            icon={Loading03Icon}
                                            strokeWidth={2}
                                            className="size-5 animate-spin"
                                        />
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-5">
                                <DataTable data={progressData} />
                            </AccordionContent>
                        </AccordionItem>

                        {/* Final */}
                        <AccordionItem
                            value="final"
                            className="overflow-hidden rounded-lg border"
                        >
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex w-full items-center justify-between pr-4">

                                    <p className="text-sm font-medium">
                                        Finalization
                                    </p>

                                    <div className="flex items-center gap-3">

                                        <span className="text-xs text-muted-foreground">
                                            Not started
                                        </span>

                                        <div className="h-3 w-3 rounded-full bg-muted" />
                                    </div>
                                </div>
                            </AccordionTrigger>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}