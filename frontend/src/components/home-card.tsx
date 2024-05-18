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
      const res = await fetch("/api/expenses/total-spent");
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
