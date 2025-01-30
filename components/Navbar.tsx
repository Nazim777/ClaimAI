'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // Import usePathname

export const Navbar = () => {
  // Get the current path
  const pathname = usePathname();

  // Animation variants for the navbar
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for the links
  const linkVariants = {
    hover: { scale: 1.1, color: "#3B82F6", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  // Function to check if the link is active
  const isActive = (href: string) => {
    return pathname === href || (pathname.startsWith(href) && pathname !== '/');
  };

  return (
    <motion.nav
      className="border-b bg-background shadow-sm dark:bg-gray-900 dark:border-gray-800"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200">
            <Link href="/">ClaimAI</Link>
          </h2>
        </div>

        {/* Navigation Links and Theme Toggle */}
        <div className="flex items-center space-x-6">
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
            <Link
              href="/"
              className={`text-sm font-medium ${
                isActive("/") ? "text-primary" : "text-gray-600"
              } ${!isActive("/") ? "hover:text-primary" : ""} transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary`}
            >
              Home
            </Link>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
            <Link
              href="/influencers"
              className={`text-sm font-medium ${
                isActive("/influencers") ? "text-primary" : "text-gray-600"
              } ${!isActive("/influencers") ? "hover:text-primary" : ""} transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary`}
            >
              Influencers
            </Link>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
            <Link
              href="/dashboard"
              className={`text-sm font-medium ${
                isActive("/dashboard") ? "text-primary" : "text-gray-600"
              } ${!isActive("/dashboard") ? "hover:text-primary" : ""} transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary`}
            >
              Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
            <Link
              href="/user-guide"
              className={`text-sm font-medium ${
                isActive("/user-guide") ? "text-primary" : "text-gray-600"
              } ${!isActive("/user-guide") ? "hover:text-primary" : ""} transition-colors duration-200 dark:text-gray-400 dark:hover:text-primary`}
            >
              Userguide
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
