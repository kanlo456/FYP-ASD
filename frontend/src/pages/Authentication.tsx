import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.tsx";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

import AuthForm from "../components/AuthForm.tsx";

const AuthenticationPage: React.FC = () => {
  return (
    <>
      <AuthForm />
    </>
  );
};

export default AuthenticationPage;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw Error("Invalid mode");
  }

  const data = await request.formData();
  const email: any = data.get("email") || "";
  const passowrd: any = data.get("password") || "";

  if (mode == "signup") {
    console.log("signup email");

    try {
      const respone = await createUserWithEmailAndPassword(
        auth,
        email,
        passowrd
      );
      console.log("sucessfully");
      return redirect("?mode=login");
    } catch (error: any) {
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        console.log("error");
        return "Invalid email";
      }
      if (
        error.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        console.log("error2");
        return "Password should be at least 6 characters";
      }
      console.log("error3", error.message);
      return "Something worng. Please contact admin.";
    }
  }
  if (mode == "login") {
    try {
      const respone = await signInWithEmailAndPassword(auth, email, passowrd);

      const token = await respone.user.getIdToken();
      const tokenData = await respone.user.getIdTokenResult();
      console.log(tokenData);
      console.log(tokenData.expirationTime.toString);
      localStorage.setItem("token", token);
      // const expiration = new Date();
      // console.log(expiration);
      // expiration.setHours(expiration.getMinutes() + 30);
      localStorage.setItem("expiration", tokenData.expirationTime);
      return redirect("/");
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
