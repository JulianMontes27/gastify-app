import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/home/home-page";

//Home page
export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});
