import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Software Engineer & <br />
            Technical Writer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Building elegant solutions to complex problems
          </p>
          <div className="flex gap-4">
            <Link
              href="/projects"
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-black dark:border-white px-6 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project cards will be added here */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Project 1</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Description of your first featured project.
              </p>
              <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
                Learn more →
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Project 2</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Description of your second featured project.
              </p>
              <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Latest Blog Posts</h2>
          <div className="space-y-8">
            {/* Blog post previews will be added here */}
            <article className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h3 className="text-xl font-bold mb-2">
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Sample Blog Post Title
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Preview of your blog post content...
              </p>
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                Read more →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}