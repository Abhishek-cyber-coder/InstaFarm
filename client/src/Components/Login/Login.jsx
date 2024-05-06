import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectIsLoading,
  selectIsAuthenticated,
} from "@/Features/Auth/authSlice";
import { useRouter } from "next/router";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onSubmit = (data) => {
    setFormData(data);
    dispatch(loginUserAsync(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [router, isAuthenticated]);

  return (
    <div className="flex flex-col justify-center gap-10 h-screen w-1/2">
      <h2 className="font-bold text-center text-4xl text-green-600">
        Login{" "}
        <span className="text-sm text-black">don't think, just log in</span>
      </h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email address" },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          className="w-5/12 bg-green-300 text-lg font-medium m-4 py-2 px-4"
          type="submit"
        >
          Login
        </button>
        <div className="gap-2 text-center">
          Not registered? Register now,{" "}
          <Link className="text-green-600 underline" href={"/register"}>
            register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
