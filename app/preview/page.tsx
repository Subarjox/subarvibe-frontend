import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import PreviewProjectPage from "@/components/preview-project"
import { Suspense } from "react"

export default function Page() {
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
                    <div className="flex flex-1 flex-col h-full">
                        <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Loading...</div>}>
                            <PreviewProjectPage />
                        </Suspense>
                    </div>
                </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}