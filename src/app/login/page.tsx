"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast"

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email === "" || user.password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  const onLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (disabled) return;
    try {
      const res = await axios.post("/api/users/login", user);
      console.log(res)
      if (res.status == 200) {
        setLoading(false);
        toast.success("Login successful");
        router.push("/profile");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className=" flex justify-evenly items-center lg:flex-row flex-col gap-4 h-screen bg-slate-700">
      <h1 className=" text-3xl font-bold mb-4">
        {" "}
        {loading ? "Processing..." : "Login"}{" "}
      </h1>
      <form
        onSubmit={onLogin}
        className=" text-slate-800  shadow-md  rounded  px-8  pt-6  pb-8  mb-4 w-full max-w-96"
      >
        <label className="  block  text-white  text-sm  font-bold  mb-2">
          Email:
          <input
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
            placeholder="email"
            required
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
          />
        </label>
        <label className=" block  text-white  text-sm  font-bold  mb-2">
          Password:
          <input
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
            required
            type="password"
            placeholder="password"
            className="  shadow appearance-none border  rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
            name="password"
          />
        </label>
        <button
          className=" rounded-lg shadow text-white disabled:bg-gray-600  bg-stone-600 p-2 hover:bg-blue-950"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
