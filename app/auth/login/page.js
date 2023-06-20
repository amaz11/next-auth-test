"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof email, typeof password);

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      {/* {searchParams?.message && (
        <p className="px-5 py-2 text-red-700 bg-red-100 rounded-md">
          {searchParams?.message}
        </p>
      )} */}
      <div className="flex flex-col gap-2 py-4 bg-white rounded-md shadow px-7">
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              // value="k.m.shaonred@gmail.com"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              // value="123456"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
