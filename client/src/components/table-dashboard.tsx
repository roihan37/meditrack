import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"
import { Card } from "./ui/card"


export function TableDashboard() {
    return (
        <Card className="xl:max-w-2xl  p-6 gap-4 overflow-auto">

            <h1 className="text-2xl ml-2">History Checkup</h1>

            <Table className="xl:w-[790px]  overflow-auto ">
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