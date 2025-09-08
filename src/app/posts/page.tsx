import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PostPage() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  console.log("fetched posts", posts);

  return (
    <main className="w-fiull h-screen flex flex-col">
      <div className="mx-auto w-[1200px]">
        <h1 className="mt-8 ml-7 mb-10 text-6xl border-b-2 border-white inline-block">
          All Posts
        </h1>
        <Link
          href="/new"
          className="mt-8 ml-5 mb-10 text-6xl border-b-2 border-white inline-block"
        >
          Create a new post
        </Link>
        <ul className="flex flex-col gap-4">
          {posts.map((post, id) => (
            <li
              key={id}
              className="flex flex-col px-9 py-7 border-2 border-white rad rounded-xl"
            >
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <a href="#">{post.author?.email ?? "Unknown"}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
