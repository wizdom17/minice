"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
import Link from "next/link";
import { Support } from "@/actions/supports";

export default function SupportTable({ data }: { data: Support[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedTransactions = [...data].sort((a, b) => {
    if (sortField === "createdAt") {
      return sortDirection === "asc"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt;
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
                <TableHead>Id</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((support) => (
                  <TableRow key={support.id}>
                    <TableCell>{support.id}</TableCell>
                    <TableCell>
                      {new Date(support.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{support.userEmail}</TableCell>
                    <TableCell>{support.subject}</TableCell>
                    <TableCell>
                      <Link
                        className="p-2 text-white bg-blue-500 rounded-md"
                        href={`/admin/dashboard/support/${support.id}`}
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
