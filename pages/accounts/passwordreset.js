import ForgetPassword from "../../components/Authentication/ForgetPassword";

const passwordHandler = (credentials) => {
  console.log(credentials);
};

export default function passwordreset() {
  return <ForgetPassword onForgetPassword={passwordHandler}></ForgetPassword>;
}
