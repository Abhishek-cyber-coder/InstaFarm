import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  selectIsLoading,
  selectIsAuthenticated,
  registerUserAsync,
} from "@/Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { getCreditsAsync } from "@/Features/Credit/creditSlice";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [formData, setFormData] = useState(null);
  const password = watch("password", "");

  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    const tempData = {
      name: data.name,
      address: data.address,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };
    setFormData(tempData);

    dispatch(registerUserAsync(tempData));
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getCreditsAsync());
  //   }
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [router, isAuthenticated]);

  return (
    <div className="flex flex-col justify-center gap-10 h-screen w-1/2">
      <h2 className="font-bold text-center text-4xl text-green-600">
        Register{" "}
        <span className="text-sm text-black">to get stuff at your doors</span>
      </h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="text"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="email"
            placeholder="Email address"
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
            type="text"
            placeholder="Mobile number"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid mobile number",
              },
            })}
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}
        </div>
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="text"
            placeholder="Current address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
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
        <div className="w-5/12 mb-2">
          <input
            className="text-lg pl-2 py-1 w-full border-2 outline-8 outline-green-300"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          className="w-5/12 bg-green-300 text-lg font-medium m-4 py-2 px-4"
          type="submit"
        >
          Register
        </button>
        <div className="gap-2 text-center">
          Already registered?{" "}
          <Link className="text-green-600 underline" href={"/login"}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
