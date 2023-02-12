import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

const useUser = ({
  redirectToIfFound = "",
  redirectToIfNotFound = "",
  shouldRedirectIfNotFound = false,
  shouldRedirectIfFound = false,
}) => {
  let token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      token = JSON.parse(localStorage.getItem("token"));
    }
    if (!token && shouldRedirectIfNotFound) {
      Router.push(redirectToIfNotFound);
    }

    if (token && shouldRedirectIfFound) {
      Router.push(redirectToIfFound);
    }
  }, [shouldRedirectIfFound, shouldRedirectIfNotFound]);
};

export default useUser;
