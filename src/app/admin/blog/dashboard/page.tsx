'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/posts/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <Link
            href="/admin/blog/new"
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}