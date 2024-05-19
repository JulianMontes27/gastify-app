import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { expenseSchema } from "../../../../server/routes/schemas";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";

type Expense = z.infer<typeof expenseSchema>;
interface ExpensesTableProps {
  data: Expense[];
  isPending: boolean;
}

const ExpensesTable = ({ data, isPending }: ExpensesTableProps) => {
  const TotalAmount = data?.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableCaption>A list of your Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{TotalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ExpensesTable;
