"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { DashboardSquare01Icon, WebDesign02Icon, Menu01Icon, ChartHistogramIcon, Folder01Icon, UserGroupIcon, Camera01Icon, File01Icon, Settings05Icon, HelpCircleIcon, SearchIcon, Database01Icon, Analytics01Icon, CommandIcon } from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Projects",
      url: "/project",
      icon: (
        <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
      ),
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Help",
      url: "#",
      icon: (
        <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
      ),
    },
  ],
  Latest_Projects: [
    {
      name: "Project-A",
      url: "#",
      icon: (
        <HugeiconsIcon icon={WebDesign02Icon} strokeWidth={2} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [latestProjects, setLatestProjects] = useState<any[]>(data.Latest_Projects)

  useEffect(() => {
    const fetchLatestProjects = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      const supabase = createBrowserClient(supabaseUrl, supabaseKey)

      const { data: projects, error } = await supabase
        .from("projects")
        .select("id, business_name")
        .order("created_at", { ascending: false })
        .limit(7)

      if (!error && projects && projects.length > 0) {
        const formattedProjects = projects.map((proj) => ({
          name: proj.business_name || "Untitled Project",
          url: `/preview?id=${proj.id}`,
          icon: <HugeiconsIcon icon={WebDesign02Icon} strokeWidth={2} />,
          id: proj.id
        }))
        setLatestProjects(formattedProjects)
      }
    }
    fetchLatestProjects()
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/project">
                <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-5!" />
                <span className="text-base font-semibold">Subarvibe</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={latestProjects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
