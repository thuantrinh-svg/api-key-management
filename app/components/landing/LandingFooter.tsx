import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 w-full px-4 md:px-6 border-t border-gray-200 bg-white/50 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-sm">
      <p className="text-xs text-gray-600 dark:text-gray-400">© 2024 API Manager Pro. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
          Privacy Policy
        </Link>
        <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
          Contact
        </Link>
      </nav>
    </footer>
  );
}

