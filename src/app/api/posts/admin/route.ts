import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { PrismaClient } from '@prisma/client';

export async function GET(request: Request) {
  try {
    // Ensure Prisma client is initialized
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection not initialized' },
        { status: 500 }
      );
    }
    // Get the authorization token from the request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      );
    }

    // Verify JWT token and get user data
    const { user_id } = verifyToken(token);

    // Verify user exists and is an admin
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const posts = await prisma.posts.findMany({
      where: { user_id: user_id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        user_id: true,
        title: true,
        excerpt: true,
        slug: true,
        readTime: true,
        createdAt: true,
        published: true
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in admin posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}