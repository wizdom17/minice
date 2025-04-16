"use client";
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

export default function TransactionTable({ data }: { data: Trx[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-400";
      case "pending":
        return "bg-orange-400";
      case "failed":
        return "bg-red-400";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <Card className="w-full shadow-none bg-inherit mt-5">
      <CardContent className="p-0">
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">Date</div>
                </TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">Status</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.slice(0, 5).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>₦{transaction.amount}</TableCell>
                    <TableCell>
                      <div
                        className={`p-1 ${getStatusBadge(
                          transaction.status
                        )} rounded-md text-sm w-fit text-white`}
                      >
                        {transaction.status}
                      </div>
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
      </CardContent>
    </Card>
  );
}
