import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
const useUser = ({ redirectTo = "", redirectIfFound = false }) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  // if (
  //   (!token && redirectTo && !redirectIfFound) ||
  //   (token && redirectIfFound)
  // ) {
  //   router.push(redirectTo);
  // }
};

export default useUser;
