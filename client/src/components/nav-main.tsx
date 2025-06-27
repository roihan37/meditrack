import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {

  const navigate = useNavigate()
  const {pathname} = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
            onClick={() => navigate('/add-result')}
              tooltip="Quick Create"
              className="dark:text-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-950 bg-purple-900 py-4 text-white min-w-8 "
            >
              <IconCirclePlusFilled />
              <span>Create Result Lab</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu  >
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className={`py-5 border dark:border-zinc-900 border-gray-50 
              ${pathname===item.url?'bg-white dark:bg-zinc-800 dark:text-zinc-200 border border-purple-100 text-purple-800 font-normal '
              :'hover:bg-zinc-100 dark:hover:bg-zinc-950'}`} tooltip={item.title}
              onClick={() => navigate(item.url)}
              >
                {item.icon && <item.icon strokeWidth={pathname===item.url?2.5:2}/>}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
