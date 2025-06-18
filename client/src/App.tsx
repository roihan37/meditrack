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

function App() {
  return (
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
            <CholesterolCard/>
        </div>

        <div className=" flex xl:flex-row gap-4 flex-col-reverse">
        
    {/* <DataTable data={data} /> */}
    <TableDashboard/>
  

            <CholesterolCard/>
        </div>

      </SidebarInset>
    </SidebarProvider>
        // <div className="">
        //   <div className="@container/main flex flex-row ">
        //     <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        //       <div className="px-4 lg:px-6">
        //       </div>
        //     </div>
        //   </div>
        // </div>
  )
}

export default App;
