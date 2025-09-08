import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {author: true},
        orderBy: {createdAt: "desc"}
    })
    return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
    const { title, content, email } = await req.json();

    const session = await getServerSession(handler);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.create({
    data: {
        title,
        content,
        author: {
            connect: {id: Number(session.user.id)}
        }
    }
    });

    return NextResponse.json(post, {status: 201})
}