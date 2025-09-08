"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      setError("");
      alert("Logged in!");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        className=""
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        required
        className=""
        placeholder="Password"
        value={password}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
