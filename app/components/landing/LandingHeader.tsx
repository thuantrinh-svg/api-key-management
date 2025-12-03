"use client";

import Link from "next/link";
import { Key, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface LandingHeaderProps {
  isAuthenticated: boolean;
  onDashboard: () => void;
  onSignIn: () => void;
}

export function LandingHeader({
  isAuthenticated,
  onDashboard,
  onSignIn,
}: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="w-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center gap-2 shrink-0" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-blue-600">
            <Key className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-base hidden sm:inline">
            API Manager Pro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 flex-1 ml-8">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="#works"
          >
            How It Works
          </Link>
        </nav>

        {/* Auth Section - Desktop Only */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated && session?.user ? (
            <>
              <div className="flex items-center gap-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {session.user.name}
                </span>
              </div>
              <button
                onClick={onDashboard}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden ml-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b sm:hidden">
          <nav className="flex flex-col p-4 gap-3">
            <Link
              className="text-sm font-medium hover:text-purple-600 transition-colors p-2"
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-purple-600 transition-colors p-2"
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:text-purple-600 transition-colors p-2"
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <button
              onClick={() => {
                isAuthenticated ? onDashboard() : onSignIn();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
