import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

interface EditProps {
  post: { id: number; title: string; content: string };
}

export default function EditPostForm(props: EditProps) {
  const { post } = props;
  const { id, title, content } = post;
  const [newcontent, setNewContent] = useState(post.content);
  const [newtitle, setNewTitle] = useState(post.title);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/posts/${id}`);
    } else {
      const data = await res.json().catch(() => {});
      alert(data.error || "Blog updating failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={newtitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border rounded text-black"
      />
      <textarea
        value={newcontent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Content"
        rows={6}
        className="p-2 border rounded text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
