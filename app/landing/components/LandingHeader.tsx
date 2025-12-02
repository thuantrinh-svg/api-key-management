"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Key, Menu, X } from "lucide-react";
import { useState } from "react";

export function LandingHeader() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="w-full h-16 flex items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-purple-600 p-2">
            <Key className="h-5 w-5 text-white" />
          </div>
          <Link
            href="/"
            className="font-bold text-lg text-gray-900 dark:text-white"
          >
            API Key Manager
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#demo"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/documentation"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={session.user.image || ""}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {session.user.name}
                </span>
              </div>
              <Link
                href="/dashboard"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
              >
                Dashboard
              </Link>
              <button
                onClick={() =>
                  signOut({ redirect: false }).then(() => router.push("/"))
                }
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => signIn("google")}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => signIn("google")}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#features"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#demo"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </Link>
            <Link
              href="/documentation"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <img
                      src={session.user.image || ""}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {session.user.name}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white text-center transition-colors hover:bg-purple-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ redirect: false }).then(() => {
                        setIsMobileMenuOpen(false);
                        router.push("/");
                      });
                    }}
                    className="block w-full text-left text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      signIn("google");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      signIn("google");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white text-center transition-colors hover:bg-purple-700"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
