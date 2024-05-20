import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses-routes"; //expenses routes

import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use(logger()); //middleware logger

//serve routes
const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/",authRoute);

//serve static files
app.use("*", serveStatic({ root: "./frontend/dist" })); //serve /frontend/dist directory
app.get("*", serveStatic({ path: "./frontend/dist/index.html" })); //always fallback to the frontend react app

export default app;
// HONO RPC: export the type to share the API spec with the Client.
export type ApiRoutes = typeof apiRoutes; //this is a typescript type that contains all info about our API endpoints
