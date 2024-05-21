import { createFileRoute } from "@tanstack/react-router";
import MyExpenses from "../../components/my-expenses/my-expenses-home";

export const Route = createFileRoute("/_authenticated/my-expenses")({
  component: MyExpenses,
});
