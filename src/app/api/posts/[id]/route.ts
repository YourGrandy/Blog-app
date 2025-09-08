import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { handler } from "../../auth/[...nextauth]/route";

export async function GET({params}: {params: { id: string}}) {

    const postId = Number(params.id);
    const post = await prisma.post.findUnique({
        include: {author: true},
        where: { id: postId }
    })
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post)
}

export async function DELETE(req: Request,
  { params }: { params: { id: string } }) {
    const postId = Number(params.id);

    if(isNaN(postId)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400})
    }

    try {
        await prisma.post.delete({
            where: {id: postId}
        })
        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch(error) {
        return NextResponse.json(
            {error: "Failed to delete post"},
            { status: 500 }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: {id: string} }
) {
    const postId = Number(params.id);

    if (isNaN(postId)) {
        return NextResponse.json({error: "Invalid id"}, {status: 400})
    }

    try {
        const body = await req.json()
        const { content, title } = body

        if (!title && !content) {
            return NextResponse.json({error: "Title and content fields should be filled"}, { status: 400 })
        }

        const updatedPost = prisma.post.update(
            {
                where: {id: postId},
                data: {content, title}
            }
        )
        return NextResponse.json(updatedPost, {status: 200})
    }catch {
        NextResponse.json({error: "Failed to update post"}, {status: 500})
    }
}