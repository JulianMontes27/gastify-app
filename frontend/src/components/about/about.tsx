import client from "@/lib/honoRPCClient";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

async function getUserData() {
  try {
    const res = await client.api["me"].$get();
    if (!res) {
      throw new Error("Please log in");
    }
  } catch (error) {
    throw new Error("Not logged in");
  }
}

const About = () => {
  return <section>About</section>;
};

export default About;
