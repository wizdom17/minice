"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import Link from "next/link";
import { UserData } from "@/actions/user";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "firstname",
    header: "First name",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      // Define background color based on status
      const bgColor = status === "active" ? "bg-green-500" : "bg-red-500";
      return (
        <div className={`capitalize text-white size-fit p-1 rounded-md ${bgColor}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: () => <div className="">Account Balance</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Registered</div>,
    cell: ({ row }) => {
      const date = moment(row.getValue("createdAt")).format(
        "MM/DD/YYYY, h:mm a"
      );
      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          className="size-fit p-1 px-2.5 text-white rounded-md bg-blue-500 text-light"
          href={`/admin/dashboard/users/${user.id}`}
        >
          View
        </Link>
      );
    },
  },
];

export function UsersTable({ data }: { data: UserData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 px-2">
        <p className="text-lg font-sans font-semibold">Manage Users</p>
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userEmail")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-muted-200"
        />
      </div>
      <div className="rounded-md mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
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
      <div className="flex items-center justify-end space-x-2 py-4 px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
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
  );
}
