import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { expenseSchema, newPostSchema } from "./schemas";
import { getUser } from "../kinde"; //routes are only called if the user is authenticated
import { db } from "../db";
import { expenses as expenseTable } from "../db/schemas/expenses";
import { desc, eq } from "drizzle-orm";

//to get the Expense as a Typescript type, we use z.infer<typeof {zod schema}>
type Expense = z.infer<typeof expenseSchema>;

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .orderBy(desc(expenseTable.createdAt))
      .limit(100);

    return c.json({ expenses });
  })
  .get("/total-spent", getUser, async (c) => {
    // // await new Promise((res) => setTimeout(res, 2000));
    // const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    // return c.json({ total });
  })
  .post(
    "/",
    getUser,
    zValidator("json", newPostSchema), //Middleware: validate incoming values using Zod
    async (c) => {
      const expense = c.req.valid("json"); //get the validated data from the POST req
      //get the currently logged in user
      const user = c.var.user;
      //insert data in the database
      const result = await db
        .insert(expenseTable)
        .values({
          ...expense,
          userId: user.id,
        })
        .returning();
      // expenses.push({ ...expense, id: expenses.length + 1 });
      c.status(201);
      return c.json(result);
    }
  ) //dynamic path parameter (Regexp to force the client to pass a number)
  .get("/:id{[0-9]+}", getUser, (c) => {
    // const id = c.req.param("id");
    // //get the expense with Id
    // const expenseWithId = expenses.find(
    //   (expense) => expense.id === parseInt(id)
    // );
    // if (!expenseWithId) {
    //   return c.notFound();
    // }
    // return c.json({ expense: expenseWithId });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    // const id = Number.parseInt(c.req.param("id"));
    // //find the index of the obj with the Id
    // const index = expenses.findIndex((expense) => expense.id === id);
    // if (index === -1) {
    //   return c.notFound();
    // }
    // //delete the index value from the array
    // expenses.splice(index, 1);
    // return c.json({ message: "Item deleted", expenses });
  });
