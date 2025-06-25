import { DataTableHistory } from "@/components/data-table-history";
import { useEffect } from "react";
import { toast } from "sonner";
import { getAllResults } from "@/api/action";
import { useAuthContext } from "@/context/AuthContext";
import { showLoadingToast } from "@/lib/toast";

export default function HistoriesPage() {
    const { setResults } = useAuthContext()
    useEffect(() => {
        const toastId = showLoadingToast({
            header: "🧬 Syncing Health Data...",
            description: "Fetching blood pressure, glucose, and cholesterol levels...",
            duration: 999999,
        })

        const fetchResultLab = async () => {
            try {
                const response = await getAllResults()
                setResults(response)
                toast.dismiss(toastId) 
            } catch (error) {
                toast.error("Failed to load data", { id: toastId, position: 'top-right' })
               
            }
        }

        fetchResultLab()
    }, [])

    return (
        <>
            <DataTableHistory />
        </>
    )
}