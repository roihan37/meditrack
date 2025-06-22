import { ChartHistories } from "@/components/chart-histories";
import { DataTableDemo } from "@/components/data-table";
import { TableDashboard } from "@/components/table-dashboard";
import data from "@/app/dashboard/data.json"

export default function HistoriesPage(){
    return(
        <>
            <ChartHistories />
            <DataTableDemo  />
        </>
    )
}