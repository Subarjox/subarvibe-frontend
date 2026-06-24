import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { GeneratingView } from "@/components/generating-view"

export default function GeneratingPage() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
            }
        >
            <TooltipProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader pageName="Add New Projects" />
                    <div className="flex flex-1 flex-col">
                        <GeneratingView />
                    </div>
                </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}
