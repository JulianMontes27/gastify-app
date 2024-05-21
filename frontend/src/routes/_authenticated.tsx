//any route thats starts wth _ is not a page, instead, its a wrapper around any page that start with _authenticated
import { createFileRoute, Outlet } from "@tanstack/react-router";
import userQueryOptions from "@/lib/query-cache";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <p>You have to login or register</p>
      <Button asChild>
        <a href="/api/login">Login!</a>
      </Button>
      <Button asChild>
        <a href="/api/register">Register!</a>
      </Button>
    </div>
  );
};

const Component = () => {
  // console.log(Route.useRouteContext())
  const { profile } = Route.useRouteContext();
  if (!profile) {
    return <Login />;
  }

  return <Outlet />;
};

// wrapper of _authenticated routes
export const Route = createFileRoute("/_authenticated")({
  //before load, check for authorization
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
