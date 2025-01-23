'use client';

import MDEditor from '@uiw/react-md-editor';

interface Post {
  title: string;
  content: string;
  createdAt: Date;
  readTime: string;
}

interface BlogPostContentProps {
  post: Post;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="min-h-screen py-20 px-4">
      <article className="container mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <MDEditor.Markdown source={post.content} />
        </div>
      </article>
    </div>
  );
}