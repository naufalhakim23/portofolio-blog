import Image from 'next/image';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. Features include user authentication, product management, and payment integration.',
    imageUrl: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    link: 'https://github.com/yourusername/ecommerce',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    imageUrl: '/projects/taskmanager.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: 'https://github.com/yourusername/taskmanager',
  },
  {
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool that creates unique artwork based on text descriptions using machine learning models.',
    imageUrl: '/projects/ai-generator.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    link: 'https://github.com/yourusername/ai-generator',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
        </p>
        
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}