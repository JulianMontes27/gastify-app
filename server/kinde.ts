import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { type Context } from "hono";
//middleware
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    if (typeof value === "string") {
      setCookie(c, key, value, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });
    } else {
      setCookie(c, key, JSON.stringify(value));
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

//MIDDLEWARE
type Env = {
  Variables: {
    user: UserType;
  };
};
// const factory = createFactory<Env>();
export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuth = await kindeClient.isAuthenticated(manager);
    if (!isAuth) {
      return c.json({ error: "Unauthorized" });
    }
    const user = await kindeClient.getUserProfile(manager);
    c.set("user", user);
    await next();
  } catch (error) {
    console.error(error);
  }
});
