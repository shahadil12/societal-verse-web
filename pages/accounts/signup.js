import SignUp from "../../components/Authentication/SignUp";
import Router from "next/router";

const addUserHandler = async (credentials) => {
  const body = { ...credentials };
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      Router.push("/");
    } else {
      throw new Error(await res.text());
    }
  } catch (error) {
    console.log(error);
  }
};

export default function signup() {
  return <SignUp onAddUser={addUserHandler}></SignUp>;
}
