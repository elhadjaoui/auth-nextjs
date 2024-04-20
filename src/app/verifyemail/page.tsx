"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";


const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
        const res = await axios.post("/api/users/verifyemail", { token });
        console.log(res);
        
      if (res.status == 200) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token || "");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <h1 className="text-3xl font-bold mb-4 text-center">Verify Email</h1>
      {verified && (
        <Link href={"/login"} className=" bg-green-900 rounded-md p-3 text-2xl">
          Login
        </Link>
      )}
      {error && <p className=" bg-red-400">Invalid or expired token</p>}
    </div>
  );
};

export default VerifyEmail;
