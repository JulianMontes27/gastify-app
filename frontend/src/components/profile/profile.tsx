import userQueryOptions from "@/lib/query-cache";

import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  //query user data
  const { data, error } = useQuery(userQueryOptions); //cached query!
  if (error) {
    return(
      <div>
        There has been an error getting your info.
      </div>
    );
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
