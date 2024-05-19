import { useQuery } from "@tanstack/react-query";
import client from "@/lib/honoRPCClient";
import ExpensesTable from "./expenses-table";

const getAllExpenses = async () => {
  const res = await client.api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const { expenses } = await res.json();
  return expenses;
};

const MyExpenses = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{isPending ? "..." : <ExpensesTable data={data} />}</div>;
};

export default MyExpenses;
