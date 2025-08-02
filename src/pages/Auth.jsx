import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../config/firebase";
import { toast } from "react-toastify";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const authText = isLogin
    ? "Do not have an account"
    : "Already have an account";

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        // Success: do nothing or navigate
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        // Success: do nothing or navigate
      }
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/email-already-in-use":
          toast.error("This email is already in use.");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters.");
          break;
        case "auth/missing-password":
          toast.error("Password is required.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        default:
          toast.error("Something went wrong. Please try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="p-10 rounded-2xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center font-sans text-white  mb-8">
          <img className="mx-auto" src={logo} alt="" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="text-white bg-gray-800 border border-gray-400 rounded py-2 px-5 w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="text-white bg-gray-800 border border-gray-400 rounded py-2 px-5 w-full"
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full py-2 ${
              isLoading ? "bg-gray-700" : "bg-purple-500"
            } rounded  text-white font-semibold  transition`}
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <button
            onClick={() => setIsLogin((open) => !open)}
            type="button"
            className="text-center text-white text-sm mt-1"
          >
            {authText} ?
          </button>
        </form>
      </div>
    </div>
  );
}
