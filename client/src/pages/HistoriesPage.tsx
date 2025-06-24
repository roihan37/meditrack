import { DataTableDemo } from "@/components/data-table";
import { TableDashboard } from "@/components/table-dashboard";
import data from "@/app/dashboard/data.json"
import { useEffect } from "react";
import { toast } from "sonner";
import { getAllResults } from "@/context/action";
import { useAuthContext } from "@/context/AuthContext";

export default function HistoriesPage(){
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
    return(
        <>
            <DataTableDemo  />
        </>
    )
}