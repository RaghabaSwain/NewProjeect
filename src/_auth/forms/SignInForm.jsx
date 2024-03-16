import React, { useState } from "react";
import { SignInConfig } from "./SignInConfig";
import { Link, useNavigate } from "react-router-dom";
import { useSignInUserAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: signInUserAccount } = useSignInUserAccount();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await signInUserAccount(formData);
    if (!session) return;
    const isLoggedIn = await checkAuthUser();
    console.log("isLoggedIn",isLoggedIn)
    if (isLoggedIn) {
      setFormData({ email: "", password: "" });
      navigate('/')
    }

    console.log(formData);
  };
  return (
    <form action="" onSubmit={handleSubmit} className="md:w-420">
      <div className="sm:w-420 flex flex-col justify-center items-center">
        <img src="./assets/images/logo.svg" alt="logo" />
        <h2 className="">Create a new account</h2>
        <p className="mb-2 text-slate-400">
          To use snapgram please enter your details
        </p>
      </div>

      {SignInConfig.map((ele) => {
        return (
          <div key={ele.name} className="flex flex-col gap-2 m-4">
            <label htmlFor={ele.id}>{ele.lable}</label>
            <input
              type={ele.type}
              name={ele.name}
              id={ele.id}
              placeholder={ele.placeholder}
              autoComplete="true"
              required
              className="h-9 rounded-lg bg-gray-900 pl-2"
              onChange={handleChange}
            />
          </div>
        );
      })}
      <div className="flex flex-col justify-center items-center gap-1 m-4">
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 flex h-9 rounded-xl justify-center items-center w-full pl-2"
        >
          <p className="">Sign In</p>
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-purple-500 hover:text-purple-600">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
