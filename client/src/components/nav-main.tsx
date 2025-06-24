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
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
            onClick={() => navigate('/add-result')}
              tooltip="Quick Create"
              className="bg-purple-900 py-4 text-primary-foreground hover:bg-purple-900 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Create Result Lab</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className={` py-5 ${location.pathname===item.url?'bg-purple-100 text-purple-700 font-normal ':'hover:bg-zinc-100'}`} tooltip={item.title}
              onClick={() => navigate(item.url)}
              >
                {item.icon && <item.icon strokeWidth={location.pathname===item.url?2.5:2}/>}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
