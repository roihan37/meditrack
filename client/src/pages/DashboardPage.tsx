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
import { CholesterolCard } from "@/components/card-colesterol"
import { TableDashboard } from "@/components/table-dashboard"

export function DashboardPage(){
    return(
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

          {/* <div className=" flex xl:flex-row gap-4 flex-col-reverse">

<CholesterolCard />
</div> */}
<TableDashboard />
          {/* <DataTable data={data} /> */}

        </SidebarInset>
      </SidebarProvider>
    )
}