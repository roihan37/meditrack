import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import data from "@/app/dashboard/data.json"
import { CholesterolCard } from "@/components/card-colesterol"
import { TableDashboard } from "@/components/table-dashboard"
import { DatePickerForm } from "@/components/data-picker-form"
import { Label } from "recharts"
import { CardDescription } from "@/components/ui/card"
import { useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { getAllResults } from "@/context/action"
import { toast } from "sonner"


export default function DashboardPage() {
  const { setResults } = useAuthContext()
  useEffect(() => {
    const toastId = toast.loading("🧬 Syncing Health Data...", {
      description: "Fetching blood pressure, glucose, and cholesterol levels...",
      position: "top-right",
      className: "bg-white border border-blue-300 text-blue-700 shadow-md",
      duration: 999999,
    });

    const fetchResultLab = async () => {
      try {
        const response = await getAllResults()
        setResults(response)
        toast.dismiss(toastId) // ✅ tutup loading setelah berhasil
      } catch (error) {
        toast.error("Failed to load data", { id: toastId, position: 'top-right' })
        console.error(error)
      }
    }

    fetchResultLab()
  }, [])

  return (
    <>
      <div className="py-4 gap-4 flex xl:flex-row flex-col w-full">
        <div className=" flex flex-col gap-4">
          <SectionCards />
          <ChartAreaInteractive />
        </div>
        <CholesterolCard />
      </div>
        <TableDashboard />
    </>
  )
}