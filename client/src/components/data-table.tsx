"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ClipboardMinus, MoreHorizontal, Repeat2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuthContext } from "@/context/AuthContext"
import { IconChevronDown, IconLayoutColumns, IconPlus } from "@tabler/icons-react"
import { Badge } from "./ui/badge"



export type LabResult = {
  id: string
  date: Date
  // status: object
  glucose: number
  ch_hdl: number
  ch_ldl: number
  ch_total: number
  bp_systolic: number
  bp_diastolic: number
}

export const columns: ColumnDef<LabResult>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "glucose",
    header: "Glucose",
  },
  {
    accessorKey: "cholesterol", // ✅ id manual
    header: "Cholesterol",
    cell: ({ row }) => {
      const { ch_hdl, ch_ldl } = row.original;
      return (
        <div className="flex flex-col">
          <span>LDL {ch_ldl}</span>
          <span>HDL {ch_hdl}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "bloodPressure", // ✅ id manual
    header: "Blood Pressure",
    cell: ({ row }) => {
      const { bp_systolic, bp_diastolic } = row.original;
      return (
        <div className="flex flex-col">
          <span>Systolic {bp_systolic}</span>
          <span>Diastolic {bp_diastolic}</span>
        </div>
      );
    },
  },
];


export function DataTableDemo() {
  const { results } = useAuthContext()

  const data: LabResult[] = React.useMemo(() => {
    return results.map((el) => ({
      id: el.id,
      date: el.date,
      glucose: el.results.glucose,
      ch_hdl: el.results.cholesterol.hdl,
      ch_ldl: el.results.cholesterol.ldl,
      ch_total: el.results.cholesterol.total,
      bp_systolic: el.results.bloodPressure.systolic,
      bp_diastolic: el.results.bloodPressure.diastolic,
    }))
  }, [results])


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="flex flex-row items-center justify-between w-full mb-4 mt-5">
          <div className="flex flex-row items-center gap-2">
            <Repeat2 className="text-purple-700 w-9 h-9" />
            <h1 className="text-3xl font-normal ">
              Medical Checkup History
            </h1>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="ml-2" variant="outline" size="sm">
              <IconPlus />
              <span className="hidden lg:inline">Add Section</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-zinc-100 " >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
