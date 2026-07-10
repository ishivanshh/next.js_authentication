"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [loading, setLoading] = useState(false);
    const buttonDisabled = !(user.email.length > 0 && user.password.length > 0 && user.username.length > 0);

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (buttonDisabled || loading) {
            return;
        }

        try {
            setLoading(true);
            const payload = {
                username: user.username.trim(),
                email: user.email.trim().toLowerCase(),
                password: user.password,
            };

            const response = await axios.post("/api/users/signup", payload);
            console.log("signup success", response.data);
            toast.success("Account created! Please log in.");
            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log("Status:", error.response?.status);
                console.log("Data:", error.response?.data);
                console.log("Error:", error.response?.data?.error);

                toast.error(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Signup failed"
                );
            } else {
                toast.error("Signup failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-semibold text-gray-800">Create Account</h1>
                <h3 className="mb-6 text-center font-semibold text-gray-800">{loading ? "processing" : "sign-up now"}</h3>

                <form onSubmit={onSignup} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none text-mauve-800 focus:border-blue-500"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none text-mauve-800 focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full rounded-lg border text-mauve-800 border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={buttonDisabled || loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? "Processing..." : buttonDisabled ? "No Sign-up" : "Click-Signup"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:underline">
                        Go to login page.
                    </Link>
                </p>
            </div>
        </div>
    );
}
