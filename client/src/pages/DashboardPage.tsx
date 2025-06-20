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
import { ChartHistories } from "@/components/chart-histories"
import { DatePickerForm } from "@/components/data-picker-form"
import { Label } from "recharts"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { getAllResults } from "@/context/action"

export default function DashboardPage() {
  
  return (
    <>
     

          <div className="py-4 gap-4 flex xl:flex-row flex-col">
            <div className=" flex flex-col gap-4">
              <SectionCards  />
              <ChartAreaInteractive />
            </div>
            <CholesterolCard  />
          </div>

          {/* <div className=" flex xl:flex-row gap-4 flex-col-reverse">

            <CholesterolCard />
          </div> */}
          <TableDashboard />
          <DataTable data={data} />
          
       
    </>
  )
}