import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger()); //middleware logger

app.get("/", (c) => {
  return c.json({ me: "works" });
});

export default app;
