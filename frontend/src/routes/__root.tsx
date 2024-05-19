import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

//Layout
export const Route = createRootRoute({
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
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </main>
  ),
});
