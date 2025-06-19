import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import data from "@/app/dashboard/data.json"
import { CholesterolCard } from "./components/card-colesterol"
import { TableDashboard } from "./components/table-dashboard"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "./components/login-form"

function App() {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />

          <div className="py-4 gap-4 flex xl:flex-row flex-col">
            <div className=" flex flex-col gap-4">
              <SectionCards />
              <ChartAreaInteractive />
            </div>
            <CholesterolCard />
          </div>

          <div className=" flex xl:flex-row gap-4 flex-col-reverse">

            <TableDashboard />


            <CholesterolCard />
          </div>
            {/* <DataTable data={data} /> */}

        </SidebarInset>
      </SidebarProvider>

      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
    </div>
    
  )
}

export default App;
