import client from "@/lib/honoRPCClient";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeCard = () => {
  // const [totalSpent, settotalSpent] = useState(0);
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await client.api.expenses["total-spent"].$get(); //instead of: fetch("/api/expenses/total-spent");
  //     if (!res.ok) {
  //     }
  //     const { total } = await res.json();
  //     settotalSpent(total);
  //   }
  //   fetchData();
  // }, []);

  // Access the client
  const queryClient = useQueryClient();

  const getTotalSpent = async () => {
    const response = await client.api.expenses["total-spent"].$get();
    if (!response.ok) {
      throw new Error("Error getting total spent");
    }
    const data = await response.json();
    return data;
  };
  // Queries
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });
  if (error) {
    return <span>Error: {error.message}</span>;
  }

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });
  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Card className="border-none flex items-center flex-col justify-center">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>The amount you've spent</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data?.total}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HomeCard;
