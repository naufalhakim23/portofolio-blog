import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Password not right" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      user_id: user.id,
      email: user.email,
      role: user.role,
    });
    
    // Return user data with token
    const { password: _, ...userData } = user;
    return NextResponse.json({
      ...userData,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}

