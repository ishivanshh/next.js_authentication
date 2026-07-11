"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import React ,  { useState } from "react";
import {useRouter} from "next/navigation";


export default function UserProfilePage(){
    const router = useRouter();
    const [data, setdata] = useState("nothing");
    // for logout
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("logout success");
            router.push("/login");
        } catch (error : any) {
            console.log("error.message" , error.message);
            toast.error(error.message);
        }
    }
    // for getting user inforamtion
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setdata(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile-Page</h1>
            <h2 className="p-1 rounded bg-green-400">
                {data=== "nothing" ? "nothing" : 
                <Link href = {`/profile/${data}`}>{data}
                    </Link>}</h2>


            <button onClick={logout} className="bg-blue-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
                logout
            </button>
            <button onClick={getUserDetails} className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                Get-Details
            </button>
        </div>
    )
}