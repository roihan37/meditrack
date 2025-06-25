import { SidebarTrigger } from "@/components/ui/sidebar"
import { CardDescription } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useAuthContext } from "@/context/AuthContext"
import { format } from "date-fns"

export function SiteHeader() {
  const {user,results} = useAuthContext()
  const latestCheckup = results[0].date
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 my-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-7" />
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-col">
            <h1 className="text-xl ">Welcome, <span className="font-bold ">{user?.username}</span> 💪</h1>
            <CardDescription className="text-xs">{`Latest Checkup, ${format(latestCheckup, "EEEE, dd MMMM yyyy")}`}</CardDescription>
          </div>
          <div className="flex flex-row items-center gap-7">
            <Switch />
            <div className="flex flex-row gap-3">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="/sasasas" alt="haiidud" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.username}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
