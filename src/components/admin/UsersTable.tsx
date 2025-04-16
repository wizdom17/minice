import { Trx, UserData } from "@/actions/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import EmptyList from "../EmptyList";
import { Eye } from "lucide-react";

export function UsersTable({ data }: { data: UserData[] }) {
  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"; // Yellow for pending
      case "banned":
        return "bg-red-600"; // Green for completed // Red for failed
      default:
        return "bg-light"; // Gray for unknown status
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="">Account Balance</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.slice(0, 5).map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {moment(user.createdAt).format("MMMM Do YYYY, h:mm a")}
              </TableCell>
              <TableCell>
                <div
                  className={`size-fit p-1 text-white rounded-md ${statusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </div>
              </TableCell>
              <TableCell>{user.firstname + " " + user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="">${user.balance}</TableCell>
              <TableCell className="text-right">
                <Eye />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="h-24 text-center">
              <EmptyList />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
