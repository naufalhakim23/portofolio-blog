import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogPostContent from './BlogPostContent';

interface BlogPostParams {
  params: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface GenerateMetadata {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getPost(slug: string) {
  const post = await prisma.posts.findUnique({
    where: {
      slug: slug,
      published: true
    }
  });

  if (!post) {
    return null;
  }

  return post;
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}