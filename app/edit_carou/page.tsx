"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CreateCarousel } from "@/components/create-carousel"

export default function EditCarouselPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <TooltipProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader pageName="Add New Projects" />

                    <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-6 lg:p-8">
                        <CreateCarousel />
                    </div>
                </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}
