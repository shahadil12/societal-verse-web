import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "../store/authReducer";

const useUser = () => {
  const dispatch = useDispatch();
  let token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      token = JSON.parse(localStorage.getItem("token"));
      dispatch(authActions.setToken(token));
    }
  }, [token]);
};

export default useUser;
