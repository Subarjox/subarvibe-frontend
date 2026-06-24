import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ModelSectionCard } from "@/components/model-template-card"
import { ProjectCards } from "@/components/project-cards"

export default async function Page() {
  const cookieStore = await cookies()

  // Inisialisasi Supabase SSR
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // [Certain] Sedot data proyek berdasarkan sesi aktif saat ini
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, business_name, status, created_at, content_data,  folder_path")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Gagal menarik data proyek:", error.message)
  }

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
          <SiteHeader pageName="Projects" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ModelSectionCard />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 px-4 lg:px-6">
                  <span className="text-lg font-bold">Your Latest Project:</span>
                </div>

                {/* [Certain] Alirkan data mentah ke komponen pelukis UI */}
                <ProjectCards initialProjects={projects || []} />

              </div>
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}