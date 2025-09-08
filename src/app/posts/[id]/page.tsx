import prisma from "@/lib/prisma";
import DeleteButton from "@/app/components/DeleteButton";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) {
    return <p>Invalid post ID</p>;
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) return <p>Post not found</p>;

  return (
    <main className="w-full h-screen flex justify-center items-center py-6 px-4">
      <div className="mx-auto w-[1200px] px-5 py-8 flex justify-between flex-row border-2 border-white rounded-xl">
        <div>
          <h1 className="mt-8 ml-7 mb-10 text-6xl border-b-2 border-white inline-block">
            {post.title}
          </h1>
          <div className="flex flex-col px-9 py-7">
            <p className="mb-2">{post.content}</p>
            <p className="text-sm text-gray-300">
              Author: {post.author?.email ?? "Unknown"}
            </p>
          </div>
        </div>
        <DeleteButton postId={post.id} />
      </div>
    </main>
  );
}
