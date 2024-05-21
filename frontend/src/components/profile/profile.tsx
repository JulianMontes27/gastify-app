import client from "@/lib/honoRPCClient";

import { useQuery } from "@tanstack/react-query";

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

const Profile = () => {
  //query user data
  const { error, data } = useQuery({
    queryKey: ["get-user-data"],
    queryFn: getUserData,
  });
  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <section>
      <main>
        <header>
          <h1 className="text-4xl font-bold">
            {data?.profile.given_name} {data?.profile.family_name}
          </h1>
        </header>
      </main>
    </section>
  );
};

export default Profile;
