import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // Checking if this user alreadsy exist
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    return NextResponse.json(
      { error: "This user is already exist" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });
  return NextResponse.json(
    { id: user.id, email: user.email, name: user.name },
    { status: 201 }
  );
}
