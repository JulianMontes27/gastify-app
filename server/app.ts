import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses-routes"; //expenses routes

const app = new Hono();

app.use(logger()); //middleware logger

app.get("/", (c) => {
  return c.json({ me: "works" });
});

//serve the expenses route
app.route("/api/expenses", expensesRoute);

export default app;
