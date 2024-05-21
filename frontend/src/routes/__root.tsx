import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

//Layout
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <main className="flex flex-col gap-5">
      <div className="flex flex-row gap-8 border">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/my-expenses" className="[&.active]:font-bold">
          My Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expense
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <a href="/api/logout">Log out</a>
      </div>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </main>
  ),
});
