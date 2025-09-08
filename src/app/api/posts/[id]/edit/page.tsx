import EditPostForm from "@/app/components/EditPostForm";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface EditPageProps {
  params: { id: string };
}

export default async function EditBlog({ params }: EditPageProps) {
  const { id } = params;
  const postId = Number(id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return <h1>Post was not found !</h1>;
  }

  return (
    <main className="w-full h-screen flex justify-center items-center py-6 px-4">
      <div className="w-[800px] border-2 border-white rounded-xl p-6">
        <h1 className="text-4xl mb-6">Edit Post</h1>
        <div className="flex flex-col">
          <EditPostForm post={post} />
          <Link href={`/posts/${post.id}/edit`}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
