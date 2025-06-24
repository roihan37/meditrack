import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { Card, CardDescription } from "./ui/card"
import { IconHistory } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "@/context/AuthContext"



export function TableDashboard() {
  const { results } = useAuthContext()

  // const generateStatus = () => {
  //     results.map((el) => {

  //         let glucoseStatus = "";
  //         if (el.results.glucose < 70) {
  //             glucoseStatus = "❗ Low";
  //         } else if (el.results.glucose <= 99) {
  //             glucoseStatus = "good";
  //         }
  //         else if (el.results.glucose <= 125) {
  //             glucoseStatus = "⚠️ Pre-diabetes";
  //         }
  //         else {
  //             "❗ Diabetes";
  //         }

  //         let cholesterolTotalStatus = "";
  //         if (el.results.cholesterol.total < 200) cholesterolTotalStatus = "good";
  //         else if (el.results.cholesterol.total <= 239) cholesterolTotalStatus = "warning:⚠️ Borderline High";
  //         else cholesterolTotalStatus = "bad:❗ High";

  //         let ldlStatus = "";
  //         if (el.results.cholesterol.ldl < 100) ldlStatus = "good";
  //         else if (el.results.cholesterol.ldl <= 129) ldlStatus = "warning:⚠️ Near Optimal";
  //         else if (el.results.cholesterol.ldl <= 159) ldlStatus = "bad:❗ Borderline High";
  //         else ldlStatus = "bad:❗ High";

  //         let hdlStatus = "";
  //         if (el.results.cholesterol.hdl < 40) hdlStatus = "bad:❗ Low";
  //         else if (el.results.cholesterol.hdl >= 60) hdlStatus = "good";
  //         else hdlStatus = "warning:⚠️ Acceptable";

  //         let systolicStatus = "";
  //         let diastolicStatus = "";

  //         if (el.results.bloodPressure.systolic < 90) systolicStatus = "bad:❗ Low";
  //         else if (el.results.bloodPressure.systolic <= 120) systolicStatus = "good";
  //         else if (el.results.bloodPressure.systolic <= 139) systolicStatus = "warning:⚠️ Pre-hypertension";
  //         else systolicStatus = "❗ Hypertension";

  //         if (el.results.bloodPressure.diastolic < 60) diastolicStatus = "bad:❗ Low";
  //         else if (el.results.bloodPressure.diastolic <= 80) diastolicStatus = "good";
  //         else if (el.results.bloodPressure.diastolic <= 89) diastolicStatus = "warning:⚠️ Pre-hypertension";
  //         else diastolicStatus = "bad:❗ Hypertension";


  //         el.results.status = {
  //             glucose: glucoseStatus,
  //             ch_total: cholesterolTotalStatus,
  //             ch_ldl: ldlStatus,
  //             ch_hdl: hdlStatus,
  //             bd_systolic: systolicStatus,
  //             bd_diastolic: diastolicStatus,

  //         }

  //         return el

  //     })

  // }
  // generateStatus()

  return (
    <Card className=" p-6 gap-4 overflow-auto mb-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl ml-2 flex flex-row items-center gap-2">
          <Badge className="p-2 bg-purple-100 text-purple-700">
            <IconHistory />
          </Badge>
          <h1 >Latest Checkup</h1>
        </div>
        <div>
          <CardDescription className="text-md">Show More</CardDescription>
        </div>
      </div>

      <Table className="overflow-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-4 min-w-[120px]">
              <>
                Date
                <br />
                <span className="text-sm text-muted-foreground">-</span>
              </>
            </TableHead>
            <TableHead className="text-center py-4 min-w-[100px]">
              <>
                Glucose
                <br />
                <span className="text-sm text-muted-foreground">(mg/dL)</span>
              </>
            </TableHead>
            <TableHead className="text-center py-4 min-w-[120px]">
              <>
                Cholesterol
                <br />
                <span className="text-sm text-muted-foreground">(mg/dL)</span>
              </>
            </TableHead>
            <TableHead className="text-end py-4 min-w-[140px]">
              <>
                Blood Pressure
                <br />
                <span className="text-sm text-muted-foreground">(mmHg)</span>
              </>
            </TableHead>
          </TableRow>
        </TableHeader>


        <TableBody>
          {[...results]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Urutkan dari terbaru
            .slice(0, 5) // Ambil 5 data pertama
            .map((el) => {
              return (
                <TableRow key={el.id}>
                  <TableCell className="text-left py-4">
                    {new Date(el.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-center py-4 font-medium">
                    {el.results.glucose}
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">LDL {el.results.cholesterol.ldl}</span>
                      <span className="text-sm">HDL {el.results.cholesterol.hdl}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-end py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">Systolic {el.results.bloodPressure.systolic}</span>
                      <span className="text-sm">Diastolic {el.results.bloodPressure.diastolic}</span>
                    </div>
                  </TableCell>

                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Card>
  )
}