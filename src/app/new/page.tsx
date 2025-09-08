"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AddNewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "Post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ title, content, email }),
    });
    if (res.ok) {
      router.push("/posts");
    }
  };
  return (
    <main className="w-full h-screen flex flex-col">
      <div className="mx-auto w-[1200px]">
        <h1 className="mt-8 ml-7 mb-10 text-6xl border-b-2 border-white inline-block">
          Create Post
        </h1>
        <Link
          href="/posts"
          className="mt-8 ml-7 mb-10 text-6xl border-b-2 border-white inline-block"
        >
          All Posts
        </Link>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create new post</button>
        </form>
      </div>
    </main>
  );
}
