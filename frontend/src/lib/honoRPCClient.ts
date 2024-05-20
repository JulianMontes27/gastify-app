import { ApiRoutes } from "../../../server/app";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/"); // "/" -> same origin as the backend
export default client;
