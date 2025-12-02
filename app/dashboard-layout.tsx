"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./components/sidebar";
import { AuthButton } from "./components/auth-button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={closeSidebar} />
      </div>

      {/* Main Content */}
      <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 lg:ml-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 md:px-6 lg:px-8">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
            )}
          </button>

          {/* Dashboard Title */}
          <h1 className="text-sm font-medium text-gray-600 dark:text-gray-400 flex-1 text-center lg:text-left">
            Dashboard
          </h1>

          {/* Auth Button */}
          <AuthButton />
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
