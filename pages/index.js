import * as React from "react";
import Login from "../components/Authentication/Login";
import Router from "next/router";

const loginHandler = async (credentials) => {
  const body = credentials;
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.status === 200 && data?.userName) {
      Router.push(`/${data.userName}`);
    } else {
      Router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export default function MyApp() {
  return <Login onLogin={loginHandler}></Login>;
}
