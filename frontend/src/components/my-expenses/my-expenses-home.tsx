import { useQuery } from "@tanstack/react-query";
import client from "@/lib/honoRPCClient";
import ExpensesTable from "./expenses-table";

const getAllExpenses = async () => {
  // await new Promise((res)=>setTimeout(res,3000))
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
  return (
    <div className="flex flex-col items-center">
      <ExpensesTable data={data} isPending={isPending} />
    </div>
  );
};

export default MyExpenses;
