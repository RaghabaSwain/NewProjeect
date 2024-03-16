import React, { useState } from "react";
import { SignUpConfig } from "./SignUpConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInUserAccount,
} from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { mutateAsync: createUserAccount } = useCreateUserAccount();
  const { mutateAsync: signInUserAccount } = useSignInUserAccount();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUserAccount(formData);
    if (!newUser) return;
    const session = await signInUserAccount({
      email: formData.email,
      password: formData.password,
    });
    if (!session) return;
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      setFormData({ name: "", username: "", email: "", password: "" });
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

      {SignUpConfig.map((ele) => {
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
          <p className="">Sign Up</p>
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-purple-500 hover:text-purple-600">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
