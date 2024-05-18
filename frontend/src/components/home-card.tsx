import client from "@/lib/honoRPCClient";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

const HomeCard = () => {
  const [totalSpent, settotalSpent] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const res = await client.api.expenses["total-spent"].$get(); //fetch("/api/expenses/total-spent");
      if (!res.ok) {
      }
      const data = await res.json();
      settotalSpent(data.total);
    }
    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{totalSpent}</p>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
