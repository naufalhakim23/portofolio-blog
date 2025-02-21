'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';

export default function NewBlogPost() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    readTime: '',
    published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        router.push('/admin/blog/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Read Time</label>
            <input
              type="text"
              value={post.readTime}
              onChange={(e) => setPost({ ...post, readTime: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., 5 min read"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <MDEditor
              value={post.content}
              onChange={(value) => setPost({ ...post, content: value || '' })}
              preview="edit"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={post.published}
              onChange={(e) => setPost({ ...post, published: e.target.checked })}
            />
            <label htmlFor="published">Publish immediately</label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}