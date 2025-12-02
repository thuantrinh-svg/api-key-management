import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/sidebar";
import { AuthButton } from "./components/auth-button";
import { NextAuthSessionProvider } from "./components/session-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Key Management",
  description: "Manage your API keys for Research API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthSessionProvider>
          <Sidebar />
          <main className="ml-64 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-800 dark:bg-gray-950">
              <h1 className="text-sm text-gray-600 dark:text-gray-400">
                Dashboard
              </h1>
              <AuthButton />
            </div>
            {children}
          </main>
          <Toaster position="top-right" richColors />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
