"use client"

import Link from "next/link"
import { useState } from "react"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { handleDownloadProject } from "@/lib/download-project"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoreHorizontalCircle01Icon, FolderOpenIcon, Share01Icon, Delete02Icon, Download04Icon } from "@hugeicons/core-free-icons"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: React.ReactNode
    id?: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <DeleteProjectDialog
        open={!!deleteProjectId}
        onOpenChange={(open) => !open && setDeleteProjectId(null)}
        projectId={deleteProjectId}
      />
      <SidebarGroupLabel>Latest Project</SidebarGroupLabel>
      <SidebarMenu>
        {items.slice(0, 7).map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-accent"
                >
                  <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem asChild>
                  <Link href={`/preview?id=${item.id}`}>
                    <HugeiconsIcon icon={FolderOpenIcon} />
                    <span>Preview</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/edit?id=${item.id}`}>
                    <HugeiconsIcon icon={Share01Icon} strokeWidth={2} />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownloadProject(item.id || "", item.name)}>
                  <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => setDeleteProjectId(item.id || null)}>
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  <span className="destructive" >Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="text-sidebar-foreground/70">
            <Link href="/project">
              <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} className="text-sidebar-foreground/70" />
              <span>More</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
