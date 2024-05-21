import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";

//middleware
import { getUser } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const user = c.var.user;
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    //get called everytime we login or signup
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (c) => {
    // const manager = sessionManager(c);
    // const isAuth = await kindeClient.isAuthenticated(manager);
    // if (!isAuth) {
    //   return c.json({ error: "Unauthorized" });
    // }
    // const profile = await kindeClient.getUserProfile(manager);
    const profile = c.var.user;
    return c.json({ profile });
  });
