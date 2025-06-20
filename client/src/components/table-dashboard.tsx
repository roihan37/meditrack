import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"
import { Card } from "./ui/card"
import { IconCircleCheckFilled, IconHistory } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "@/context/AuthContext"

type StatusResult = {
    glucose: number,
    cholesterol: {
        total: number,
        ldl: number,
        hdl: number,
    },
    bloodPressure: {
        systolic: number,
        diastolic: number,
    }
}

export function TableDashboard() {
    const { results } = useAuthContext()
    const generateStatus = () => {
        const status = results.map((el) => {

            let glucoseStatus = "";
            if (el.results.glucose < 70) {
                glucoseStatus = "❗ Low";
            } else if (el.results.glucose <= 99) {
                glucoseStatus = "good";
            }
            else if (el.results.glucose <= 125) {
                glucoseStatus = "⚠️ Pre-diabetes";
            }
            else {
                "❗ Diabetes";
            }

            let cholesterolTotalStatus = "";
            if (el.results.cholesterol.total < 200) cholesterolTotalStatus = "good";
            else if (el.results.cholesterol.total <= 239) cholesterolTotalStatus = "⚠️ Borderline High";
            else cholesterolTotalStatus = "❗ High";

            let ldlStatus = "";
            if (el.results.cholesterol.ldl < 100) ldlStatus = "good";
            else if (el.results.cholesterol.ldl <= 129) ldlStatus = "⚠️ Near Optimal";
            else if (el.results.cholesterol.ldl <= 159) ldlStatus = "❗ Borderline High";
            else ldlStatus = "❗ High";

            let hdlStatus = "";
            if (el.results.cholesterol.hdl < 40) hdlStatus = "❗ Low (Bad)";
            else if (el.results.cholesterol.hdl >= 60) hdlStatus = "good";
            else hdlStatus = "⚠️ Acceptable";

            let systolicStatus = "";
            let diastolicStatus = "";

            if (el.results.bloodPressure.systolic < 90) systolicStatus = "❗ Low";
            else if (el.results.bloodPressure.systolic <= 120) systolicStatus = "good";
            else if (el.results.bloodPressure.systolic <= 139) systolicStatus = "⚠️ Pre-hypertension";
            else systolicStatus = "❗ Hypertension";

            if (el.results.bloodPressure.diastolic < 60) diastolicStatus = "❗ Low";
            else if (el.results.bloodPressure.diastolic <= 80) diastolicStatus = "good";
            else if (el.results.bloodPressure.diastolic <= 89) diastolicStatus = "⚠️ Pre-hypertension";
            else diastolicStatus = "❗ Hypertension";


            el.results.status = {
                glucose: glucoseStatus,
                cholesterol: {
                    total: cholesterolTotalStatus,
                    ldl: ldlStatus,
                    hdl: hdlStatus,
                },
                bloodPressure: {
                    systolic: systolicStatus,
                    diastolic: diastolicStatus,
                }
            }

            return el

        })
        console.log(status);

    }

    generateStatus()

    return (
        <Card className=" p-6 gap-4 overflow-auto">
            <div className="text-2xl ml-2 flex flex-row items-center gap-2">
                <IconHistory />
                <h1 >Latest Checkup</h1>
            </div>

            <Table className="  overflow-auto  ">
                <TableHeader  >
                    <TableRow >
                        <TableHead className="py-5 ">
                            <>
                                Date
                                <br />
                                <span className="text-sm text-muted-foreground">-</span>
                            </>
                        </TableHead>
                        <TableHead className="text-center">
                            <>
                                Status
                                <br />
                                <span className="text-sm text-muted-foreground">-</span>
                            </>
                        </TableHead>
                        <TableHead className="text-center">
                            <>
                                Glucose
                                <br />
                                <span className="text-sm text-muted-foreground">(mg/dL)</span>
                            </>
                        </TableHead>
                        <TableHead className="text-center">
                            <>
                                Cholesterol
                                <br />
                                <span className="text-sm text-muted-foreground">(mg/dL)</span>
                            </>
                        </TableHead>
                        <TableHead className="text-center">
                            <>
                                Blood Pressure
                                <br />
                                <span className="text-sm text-muted-foreground">(mmHg)</span>
                            </>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        results.map((el) => {
                            return (
                                <TableRow>
                                    <TableCell >{new Date(el.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short", // atau "2-digit" untuk angka
                                        day: "2-digit",
                                    })}</TableCell>
                                    <TableCell className="text-center">      <Badge variant="destructive">Badge</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">{`${el.results.glucose}`}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col gap-2">
                                            <span>{`LDL ${el.results.cholesterol.ldl}`}</span>
                                            <span>{`HDL ${el.results.cholesterol.hdl}`}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col gap-2">
                                            <span>{`Systolic ${el.results.bloodPressure.systolic}`}</span>
                                            <span>{`Diastolic ${el.results.bloodPressure.diastolic}`}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Card>
    )
}