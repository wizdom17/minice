"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample transaction data
const sampleTransactions = [
  {
    id: "1",
    type: "Payment",
    date: "2023-04-01",
    reference: "INV-001",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: "2",
    type: "Refund",
    date: "2023-04-02",
    reference: "REF-001",
    amount: "$50.00",
    status: "Completed",
  },
  {
    id: "3",
    type: "Payment",
    date: "2023-04-03",
    reference: "INV-002",
    amount: "$120.00",
    status: "Pending",
  },
  {
    id: "4",
    type: "Subscription",
    date: "2023-04-04",
    reference: "SUB-001",
    amount: "$15.99",
    status: "Completed",
  },
  {
    id: "5",
    type: "Payment",
    date: "2023-04-05",
    reference: "INV-003",
    amount: "$75.50",
    status: "Failed",
  },
  {
    id: "6",
    type: "Refund",
    date: "2023-04-06",
    reference: "REF-002",
    amount: "$25.00",
    status: "Pending",
  },
  {
    id: "7",
    type: "Subscription",
    date: "2023-04-07",
    reference: "SUB-002",
    amount: "$9.99",
    status: "Completed",
  },
  {
    id: "8",
    type: "Payment",
    date: "2023-04-08",
    reference: "INV-004",
    amount: "$199.99",
    status: "Completed",
  },
  {
    id: "9",
    type: "Payment",
    date: "2023-04-09",
    reference: "INV-005",
    amount: "$45.00",
    status: "Failed",
  },
  {
    id: "10",
    type: "Subscription",
    date: "2023-04-10",
    reference: "SUB-003",
    amount: "$29.99",
    status: "Completed",
  },
  {
    id: "11",
    type: "Payment",
    date: "2023-04-11",
    reference: "INV-006",
    amount: "$150.00",
    status: "Pending",
  },
  {
    id: "12",
    type: "Refund",
    date: "2023-04-12",
    reference: "REF-003",
    amount: "$75.00",
    status: "Completed",
  },
];

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Sort transactions
  const sortedTransactions = [
    ...(showEmptyState ? [] : sampleTransactions),
  ].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

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
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadge(transaction.status) as any}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-96 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative w-40 h-40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 300 200"
                          fill="none"
                        >
                          <path
                            d="M150 180C190 180 220 150 220 110C220 70 190 40 150 40C110 40 80 70 80 110C80 150 110 180 150 180Z"
                            fill="#E2E8F0"
                          />
                          <path
                            d="M120 130C140 130 150 120 150 100C150 80 140 70 120 70C100 70 90 80 90 100C90 120 100 130 120 130Z"
                            fill="#CBD5E1"
                          />
                          <path
                            d="M150 110C150 110 160 105 170 110C180 115 190 120 200 115"
                            stroke="#64748B"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M130 90C135 90 135 85 130 85C125 85 125 90 130 90Z"
                            fill="#1E293B"
                          />
                          <path
                            d="M110 90C115 90 115 85 110 85C105 85 105 90 110 90Z"
                            fill="#1E293B"
                          />
                          <path
                            d="M220 80C225 75 230 70 235 75C240 80 245 85 250 80"
                            stroke="#64748B"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M240 60C245 55 250 50 255 55C260 60 265 65 270 60"
                            stroke="#64748B"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M260 40C265 35 270 30 275 35C280 40 285 45 290 40"
                            stroke="#64748B"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p className="text-xl font-medium text-gray-500">
                        No Transactions
                      </p>
                    </div>
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
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, i, arr) => (
                    <>
                      {i > 0 && arr[i - 1] !== page - 1 && (
                        <span key={`ellipsis-${i}`} className="px-2">
                          ...
                        </span>
                      )}
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </Button>
                    </>
                  ))}
              </div>
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
