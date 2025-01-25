'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlogPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      router.push('/admin/blog/dashboard');
    }
  }, [router]);

  return null; // This page will redirect, so no need for content
}