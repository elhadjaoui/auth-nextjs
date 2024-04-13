"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [loading, setLoading] = useState(false);
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
  return (
    <div className="flex justify-evenly items-center  flex-col gap-4 h-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <button onClick={logout} className="btn bg-red-400  p-2 rounded-lg ">
       {loading ? "Processing" : "Log out"}
      </button>
    </div>
  );
};

export default Profile;
