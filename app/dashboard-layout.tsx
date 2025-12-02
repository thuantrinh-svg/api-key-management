"use client";

import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { AuthButton } from "./components/auth-button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-800 dark:bg-gray-950">
          <h1 className="text-sm text-gray-600 dark:text-gray-400">
            Dashboard
          </h1>
          <AuthButton />
        </div>
        {children}
      </main>
    </div>
  );
}

