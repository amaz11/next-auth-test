"use client";

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

const Login = ({ searchParams }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      {searchParams?.message && (
        <p className="px-5 py-2 text-red-700 bg-red-100 rounded-md">
          {searchParams?.message}
        </p>
      )}
      <div className="flex flex-col gap-2 py-4 bg-white rounded-md shadow px-7">
        <input
          type="email"
          className="p-2 border border-black focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="p-2 border border-black focus:outline-none"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="p-3 bg-green-600" onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
