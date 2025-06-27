import { SidebarTrigger } from "@/components/ui/sidebar"
import { CardDescription } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuthContext } from "@/context/AuthContext"
import { format } from "date-fns"
import { useLocation } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-provider"


export function SiteHeader() {
  const { user, results } = useAuthContext()
  const latestCheckupDate = results[0]?.date;
  const { pathname } = useLocation()
  const { setTheme } = useTheme()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 my-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-6 gap-4 ">
        <SidebarTrigger className="-ml-6 dark:text-white dark:bg-zinc-900" />
        <div className="flex flex-row justify-between w-full items-start ">
          <div className="flex flex-col ">
            {
              pathname === '/add-result'
                ? <>
                  <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl  font-semibold ">Laboratory Results</h1>
                  </div>
                  <p className="text-xs text-zinc-400 ">Add Results Lab</p>
                </>
                : <>
                  <h1 className="text-sm sm:text-xl ">Welcome, <span className="font-bold ">{user?.username}</span> 💪</h1>
                  {
                    latestCheckupDate
                      ? <div className="flex flex-col lg:flex-row lg:gap-1 ">
                        <CardDescription className="text-xs hidden sm:inline">{`Latest Checkup, `}</CardDescription>
                        <CardDescription className="text-xs">{format(latestCheckupDate, "EEEE, dd MMMM yyyy")}</CardDescription>
                      </div>
                      : <CardDescription className="text-xs">You have never checked up</CardDescription>
                  }
                </>
            }

          </div>
          <div className="flex flex-row mt-1 items-center gap-3 lg:gap-7 -mr-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-row gap-3">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="/sasasas" alt="haiidud" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
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
