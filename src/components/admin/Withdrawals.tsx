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
import { Trx } from "@/actions/user";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WithdrawalsTable({ data }: { data: Trx[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState<Trx>();

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

  const handleView = async (trx: Trx) => {
    setOpenDialog(true);
    setSelectedTrx(trx);
  };

  const handleCompleted = async () => {
    try {
      const res = await axios.post("/api/admin/withdrawal", {
        id: selectedTrx?.id,
        type: "completed",
        userId: selectedTrx?.userId,
        amount: selectedTrx?.amount,
      });
      if (res.status === 200) {
        setOpenDialog(false);
        toast.success("withdrawal completed");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("error occured");
    }
  };
  const handleDeclined = async () => {
    try {
      const res = await axios.post("/api/admin/withdrawal", {
        id: selectedTrx?.id,
        type: "declined",
        userId: selectedTrx?.userId,
        amount: selectedTrx?.amount,
      });
      if (res.status === 200) {
        setOpenDialog(false);
        toast.success("withdrawal declined");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("error occured");
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
                <TableHead>Reference</TableHead>
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
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.userEmail}</TableCell>
                    <TableCell>₦{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>
                      {transaction.type === "withdrawal" && (
                        <Button
                          onClick={() => handleView(transaction)}
                          className="p-2 bg-blue-500 text-white rounded-md"
                        >
                          view
                        </Button>
                      )}
                      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Transfer funds to the details below
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex mt-4 flex-col gap-y-3">
                            <div className="flex items-center justify-between">
                              <p>Account Number:</p>
                              <p className="text-slate-500">
                                {selectedTrx?.accountNumber}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p>Account Name:</p>
                              <p className="text-slate-500">
                                {selectedTrx?.accountName}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p>Bank Name:</p>
                              <p className="text-slate-500">
                                {selectedTrx?.bankName}
                              </p>
                            </div>
                            {transaction.status === "completed" ? (
                              <div className=" bg-green-500 p-3 rounded-md text-white">Accepted</div>
                            ) : (
                              <div className="flex mt-5 items-center justify-center gap-x-5">
                                <Button
                                  onClick={handleCompleted}
                                  className="bg-green-500"
                                >
                                  Complete
                                </Button>
                                <Button
                                  onClick={handleDeclined}
                                  className="bg-red-500"
                                >
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-96 text-center">
                    No Transactions
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
