import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { expenseSchema } from "../../../../server/routes/schemas";

export type Expense = z.infer<typeof expenseSchema>;
//Note: Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.
export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "amount",
    //format the amount cell to display the dollar amount. We'll also align the cell to the right.
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
