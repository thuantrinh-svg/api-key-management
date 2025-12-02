"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  FileText,
  Code,
  FileCheck,
  BookOpen,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const navigationItems = [
  {
    name: "Overview",
    href: "/",
    icon: Home,
    enabled: true,
  },
  {
    name: "Research Assistant",
    href: "/research-assistant",
    icon: Search,
    enabled: true,
  },
  {
    name: "Research Reports",
    href: "/research-reports",
    icon: FileText,
    enabled: true,
  },
  {
    name: "API Playground",
    href: "/api-playground",
    icon: Code,
    enabled: true,
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: FileCheck,
    enabled: true,
  },
  {
    name: "Documentation",
    href: "/documentation",
    icon: BookOpen,
    enabled: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            API Key Management
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isDisabled = !item.enabled;

            return (
              <Link
                key={item.name}
                href={isDisabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive && item.enabled
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : isDisabled
                    ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                )}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                  }
                }}
                aria-disabled={isDisabled}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

