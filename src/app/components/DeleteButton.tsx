"use client";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/posts");
    } else {
      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Unkown error" };
      }
      alert(data.error || "Failed to delete post");
    }
  };

  return (
    <FaRegTrashCan
      className="text-white text-3xl shrink-0 self-end mb-8 mr-6 cursor-pointer"
      onClick={handleDelete}
    />
  );
}
