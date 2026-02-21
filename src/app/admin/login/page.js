"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/amin/profile");
      router.refresh();
    } else {
      setError("Invalid login. Please check your username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <input
          name="username"
          placeholder="Username"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button className="w-full bg-black text-white p-3 rounded-xl font-bold">Login</button>
      </form>
    </div>
  );
}