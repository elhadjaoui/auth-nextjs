"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('')
    const router = useRouter();
  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push('/')
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
    }
    finally
    {
        setLoading(false)
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/detail");
      console.log(res);
      setUserId(res.data._id)
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getUserDetails();
  }
  , [userId])
  return (
    <div className="flex justify-evenly items-center  flex-col gap-4 h-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-xl p-3 m-3">User ID: <span className="bg-red-400  p-2 rounded"> {userId} </span> </p>
      <button onClick={logout} className="btn bg-red-400  p-2 rounded-lg ">
       {loading ? "Processing" : "Log out"}
      </button>
    </div>
  );
};

export default Profile;
