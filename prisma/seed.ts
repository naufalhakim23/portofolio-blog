const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: 'Getting Started with Next.js 13 and Server Components',
      content: '# Getting Started with Next.js 13 and Server Components\n\nNext.js 13 introduces a revolutionary way to build React applications with its new Server Components feature. In this post, we\'ll explore how Server Components can improve your application\'s performance and developer experience.\n\n## What are Server Components?\n\nServer Components allow you to render React components on the server, reducing the JavaScript bundle size sent to the client. This results in faster page loads and improved performance.\n\n## Key Benefits\n\n- Reduced Client-side JavaScript\n- Improved Initial Page Load\n- Better SEO\n- Simplified Data Fetching\n\n## Example Implementation\n\n```tsx\nexport default async function Page() {\n  const data = await fetchData();\n  return <div>{data.map(item => <ServerComponent item={item} />)}</div>;\n}\n```\n\nStay tuned for more in-depth tutorials on Next.js 13 features!',
      excerpt: 'Explore the revolutionary Server Components feature in Next.js 13 and learn how it can improve your application\'s performance.',
      slug: 'getting-started-with-nextjs-13-server-components',
      readTime: '5 min read',
      published: true,
      createdAt: new Date('2024-01-15')
    },
    {
      title: 'Modern State Management with React Query',
      content: '# Modern State Management with React Query\n\nManaging server state in React applications can be challenging. React Query simplifies this process by providing a powerful set of tools for fetching, caching, and updating data.\n\n## Why React Query?\n\nReact Query handles many complex aspects of state management:\n\n- Automatic background updates\n- Cache management\n- Error handling\n- Pagination support\n\n## Basic Implementation\n\n```typescript\nimport { useQuery } from "@tanstack/react-query";\n\nfunction TodoList() {\n  const { data, isLoading } = useQuery({\n    queryKey: ["todos"],\n    queryFn: fetchTodos,\n  });\n\n  if (isLoading) return <div>Loading...</div>;\n  return <div>{data.map(todo => <Todo key={todo.id} {...todo} />)}</div>;\n}\n```\n\nLearn more about effective state management in our upcoming posts!',
      excerpt: 'Discover how React Query simplifies server state management in React applications with its powerful features and intuitive API.',
      slug: 'modern-state-management-with-react-query',
      readTime: '7 min read',
      published: true,
      createdAt: new Date('2024-01-20')
    },
    {
      title: 'Building Accessible Web Applications',
      content: '# Building Accessible Web Applications\n\nAccessibility is not just a feature—it\'s a necessity. Learn how to create web applications that are accessible to everyone, regardless of their abilities.\n\n## Core Principles\n\n1. Semantic HTML\n2. ARIA attributes\n3. Keyboard navigation\n4. Color contrast\n\n## Practical Tips\n\n### Semantic HTML\n\n```html\n<!-- Bad -->\n<div class="button" onclick="submit()">Submit</div>\n\n<!-- Good -->\n<button type="submit">Submit</button>\n```\n\n### Keyboard Navigation\n\n```typescript\nfunction AccessibleButton({ onClick, children }) {\n  return (\n    <button\n      onClick={onClick}\n      onKeyDown={(e) => e.key === \'Enter\' && onClick()}\n      tabIndex={0}\n    >\n      {children}\n    </button>\n  );\n}\n```\n\nMake your web applications accessible from day one!',
      excerpt: 'Learn essential principles and practical tips for building web applications that are accessible to all users.',
      slug: 'building-accessible-web-applications',
      readTime: '6 min read',
      published: true,
      createdAt: new Date('2024-01-25')
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });