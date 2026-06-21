"use client"

import Image from "next/image"

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { HugeiconsIcon } from "@hugeicons/react"

import {
    MoreHorizontalCircle01Icon,
    FolderOpenIcon,
    Download04Icon,
    PencilEdit02Icon,
    Delete02Icon,
    Image01Icon,
} from "@hugeicons/core-free-icons"

export function NewProjectCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 lg:px-6">

            <Card className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-zinc-700 dark:hover:border-zinc-300">
                <CardContent className="p-1.5">
                    {/* Top Right Menu */}
                    <div className="absolute right-5 top-5 z-20 opacity-40 transition-opacity duration-200 group-hover:opacity-100">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className=" border border-border bg-background/80 backdrop-blur-md hover:bg-muted"
                                >
                                    <HugeiconsIcon
                                        icon={MoreHorizontalCircle01Icon}
                                        strokeWidth={2}
                                    />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-44 rounded-xl"
                            >
                                <DropdownMenuItem className="cursor-pointer gap-2">
                                    <HugeiconsIcon
                                        icon={FolderOpenIcon}
                                        strokeWidth={2}
                                        className="size-4"
                                    />
                                    Open
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer gap-2">
                                    <HugeiconsIcon
                                        icon={Download04Icon}
                                        strokeWidth={2}
                                        className="size-4"
                                    />
                                    Download
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer gap-2">
                                    <HugeiconsIcon
                                        icon={PencilEdit02Icon}
                                        strokeWidth={2}
                                        className="size-4"
                                    />
                                    Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer gap-2 text-red-500 focus:text-red-500">
                                    <HugeiconsIcon
                                        icon={Delete02Icon}
                                        strokeWidth={2}
                                        className="size-4"
                                    />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative  h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-muted ">
                        {/* Example Image */}
                        {/*
                        <Image
                            src="/example.jpg"
                            alt="Project Thumbnail"
                            fill
                            className="object-cover"
                        />
                        */}

                        <HugeiconsIcon
                            icon={Image01Icon}
                            strokeWidth={1.5}
                            className="size-14 text-muted-foreground"
                        />
                    </div>

                    {/* Bottom Content */}
                    <div className="px-1 pb-1 pt-4">
                        <CardTitle className="line-clamp-1 text-lg font-semibold">
                            Project A
                        </CardTitle>

                        <CardDescription className="mt-2 line-clamp-2 text-sm leading-relaxed">
                            Project description lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}