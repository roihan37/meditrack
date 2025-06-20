import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"
import { Card } from "./ui/card"
import { IconHistory } from "@tabler/icons-react"


export function TableDashboard() {
    return (
        <Card className=" p-6 gap-4 overflow-auto">
            <div className="text-2xl ml-2 flex flex-row items-center gap-2">
                <IconHistory />
                <h1 >Checkup History</h1>
            </div>

            <Table className="  overflow-auto ">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Glucose</TableHead>
                        <TableHead>Cholesterol</TableHead>
                        <TableHead >Blood Pressure</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell >INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell >$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    )
}