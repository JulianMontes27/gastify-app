import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses-routes"; //expenses routes

import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(logger()); //middleware logger

//serve the expenses route
app.route("/api/expenses", expensesRoute);
//serve static files
app.use("*", serveStatic({ root: "./frontend/dist" })); //serve /frontend/dist directory
app.get("*", serveStatic({ path: "./frontend/dist/index.html" })); //always fallback to the frontend react app

export default app;
