"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from 'axios'
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter()
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (user.email === "" || user.password === "" || user.username === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  const onSignup = async (e: any) => {
    e.preventDefault();
    if (disabled) return;
    try {
      setLoading(true);
      const res = await axios.post('/api/users/signup', user)
      console.log(res)
      if (res.status === 200) {
        toast.success('Signup successful')
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
    console.log(user);
  };
  return (
    <div className=" flex justify-evenly items-center lg:flex-row flex-col gap-4 h-screen bg-slate-700">
      <h1 className=" text-3xl font-bold mb-4"> {loading ? "Processing..." : "Signup"} </h1>
      <form
        onSubmit={onSignup}
        className=" text-slate-800  shadow-md  rounded  px-8  pt-6  pb-8  mb-4 w-full max-w-96"
      >
        <label className="  block  text-white  text-sm  font-bold  mb-2">
          Username:
          <input
            onChange={(e) => {
              setUser({
                ...user,
                username: e.target.value,
              });
            }}
            value={user.username}
            placeholder="username"
            required
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="username"
            name="username"
          />
        </label>
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
            value={user.email}
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
            value={user.password}
          />
        </label>
        <button
          disabled={disabled}
          className=" rounded-lg shadow text-white bg-stone-600 disabled:cursor-not-allowed disabled:bg-gray-500  p-2 hover:bg-blue-950"
          type="submit"
        >
          Signup
        </button>
        <div>
          <hr className="border-2 border-gray-600 w-1/2 m-3" />
          <Link href="/login">
            <p className="text-white  font-bold underline ">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
