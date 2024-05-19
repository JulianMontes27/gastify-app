import { useQuery } from "@tanstack/react-query";
import client from "@/lib/honoRPCClient";

import { DataTable } from "./data-table";
import { Expense, columns } from "./columns";

async function getData(): Promise<Expense[]> {
  //get the data from the server
  try {
    const res = await client.api.expenses.$get();
    if (!res.ok) {
      throw new Error("Error getting all the expenses");
    }
    const data = await res.json();
    return data.expenses;
  } catch (error) {
    throw new Error("Error getting all the expenses");
  }
}

const MyExpenses = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: getData,
  });
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="flex flex-col gap-y-4 mt-5 mb-5">
      <section className="flex items-center justify-center">
        <header className="text-3xl font-bold">Your Expenses</header>
      </section>
      <section className="container mx-auto max-w-3xl">
        <DataTable columns={columns} data={data} isPending={isPending} />
      </section>
    </div>
  );
};

export default MyExpenses;
