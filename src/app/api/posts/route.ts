import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        readTime: true,
        createdAt: true
      }
    });
    return NextResponse.json(posts);
  } catch (_error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const post = await prisma.post.create({
      data: json
    });
    return NextResponse.json(post);
  } catch (_error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}