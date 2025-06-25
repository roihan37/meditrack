import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { CholesterolCard } from "@/components/card-colesterol"
import { TableDashboard } from "@/components/table-dashboard"
import { useAuthContext } from "@/context/AuthContext"
import { getAllResults } from "@/api/action"
import { SectionCards } from "@/components/section-cards"
import { useEffect } from "react"
import { toast } from "sonner"
import { showLoadingToast } from "@/lib/toast"


export default function DashboardPage() {
  const { setResults } = useAuthContext()
  useEffect(() => {
    const toastId = showLoadingToast({
      header: "🧬 Syncing Health Data...",
      description: "Fetching blood pressure, glucose, and cholesterol levels...",
      duration: 5000,
  })

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