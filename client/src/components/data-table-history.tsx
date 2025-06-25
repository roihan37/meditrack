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
import { Repeat2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import type { TableLabResult } from "@/types/lab"

export const columns: ColumnDef<TableLabResult>[] = [
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


export function DataTableHistory() {
  const { results } = useAuthContext()

  const data: TableLabResult[] = React.useMemo(() => {
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
      
        {/* header */}
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

      {/* body/table */}
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

      {/* footer */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
        Showing {table.getRowModel().rows.length} of {table.getPrePaginationRowModel().rows.length} results lab | Page {table.getState().pagination.pageIndex + 1}
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
