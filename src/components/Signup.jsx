import React, { useState } from "react";
import Authentication from "../components/appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    console.log("email veja gya" , data.email)
    // ek async function chlaya jisme parameter data pass kiya.
    setError(""); // error ko empty string se set kiya taki error message clear ho jaye
    try {
      const userData = await Authentication.createAccount(data); // createAccount method ko call kiya jo data ko pass kiya
      if (userData) {
        // agar userData milta hai toh
        const USERdata = await Authentication.getCurrentUser(); // getCurrentUser method ko call kiya
        if (USERdata) dispatch(login(USERdata)); // agr current user data milta hai toh login method ko call kiya or dispatch kiya
        navigate("/"); // navigate method ko call kiya jo user ko login k baad home page pr redirect karega
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
             Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    console.log("email", value);
                     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Enter a valid email adress"}
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Create password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    "Password must be at least one lowercase, one uppercase, one digit, one special char, minimum 8 length.",
                },
              })}
            />
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
