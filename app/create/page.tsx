import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import NewProjectPage from "@/components/new-project"
import { CreateDialog } from "@/components/create-dialog"

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
                    <SiteHeader pageName="Add New Projects" />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <NewProjectPage />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}