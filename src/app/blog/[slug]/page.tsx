import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogPostContent from './BlogPostContent';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
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
  // Ensure params is resolved before accessing slug
  const resolvedParams = await Promise.resolve(params);
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}