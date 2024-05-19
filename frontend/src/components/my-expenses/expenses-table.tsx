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

type Expense = z.infer<typeof expenseSchema>;
interface ExpensesTableProps {
  data: Expense[];
}

const ExpensesTable = ({ data }: ExpensesTableProps) => {
  const TotalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <Table className="border max-w-xl m-auto">
      <TableCaption>A list of your Expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((expense) => (
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
  );
};

export default ExpensesTable;
