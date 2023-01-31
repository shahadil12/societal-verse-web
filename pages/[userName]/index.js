import { useState, useEffect } from "react";
import useUser from "../../lib/customHook";
import HomePage from "../../components/HomePage/HomePage";

export default function homePage() {
  const [User, setUser] = useState("");

  useEffect(() => {
    async function getUser() {
      const user = await useUser();
      setUser(user);
    }
    getUser();
  }, []);

  return <HomePage />;
}
