import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm dark:bg-black/80 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-gray-600 transition-colors">
            Portfolio
          </Link>

          {/* Mobile menu button and menu using HTML details element */}
          <details className="md:hidden">
            <summary className="list-none" aria-label="Toggle menu">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path className="[details[open]_&]:hidden" d="M4 6h16M4 12h16M4 18h16" />
                <path className="hidden [details[open]_&]:block" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </summary>

            {/* Mobile menu */}
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg">
              <div className="flex flex-col space-y-4 px-4 py-6">
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  Home
                </Link>
                <Link href="/projects" className="hover:text-gray-600 transition-colors">
                  Projects
                </Link>
                <Link href="/blog" className="hover:text-gray-600 transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="hover:text-gray-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </details>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}