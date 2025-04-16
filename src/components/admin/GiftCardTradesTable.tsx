"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trade } from "@/actions/trades";
import Link from "next/link";

export default function GiftCardTradesTable({ data }: { data: Trade[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedTransactions = [...data].sort((a, b) => {
    if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt;
    } else if (sortField === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.userEmail}</TableCell>
                    <TableCell>₦{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>
                      <Link
                        className="p-2 text-white bg-blue-500 rounded-md"
                        href={`/admin/dashboard/trades/giftcard/${transaction.id}`}
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-96 text-center">
                    No Trades
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {sortedTransactions.length > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedTransactions.length)} of{" "}
              {sortedTransactions.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
