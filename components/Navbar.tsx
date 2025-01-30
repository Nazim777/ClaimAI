
'use client'
import Link from "next/link";


export const Navbar = () => {

  return (
    <nav className="border-b bg-background shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200">
            <Link href="/">ClaimAI</Link>
          </h2>
        </div>

        {/* Navigation Links and Theme Toggle */}
        <div className="flex items-center space-x-6">
        <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary"
          >
            Home
          </Link>
        <Link
            href="/influencers"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary"
          >
            Influencers
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/user-guide"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary"
          >
            Userguide
          </Link>  
        </div>
      </div>
    </nav>
  );
};