import { queryOptions } from "@tanstack/react-query";
import client from "./honoRPCClient";

async function getUserData() {
  try {
    const res = await client.api["me"].$get();
    if (!res) {
      throw new Error("Please log in");
    }
    const data = await res.json();
    // console.log(data.profile.given_name);
    return data;
  } catch (error) {
    throw new Error("Not logged in");
  }
}

const userQueryOptions = queryOptions({
  queryKey: ["get-user-data"],
  queryFn: getUserData,
  staleTime: Infinity, //the moment a component uses these query options, the result will be cached until we manually invalidate it or the user logs in or out or refreshes the page.
});

export default userQueryOptions;
