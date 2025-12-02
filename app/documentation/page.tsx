"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Code, Key, Zap, Shield } from "lucide-react";
import DashboardLayout from "../dashboard-layout";

type Section = {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections: Section[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Getting Started
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to the API Key Management documentation. This guide will help you
            get started with our API in just a few minutes.
          </p>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
            <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
              Quick Start
            </h3>
            <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              <li>1. Create an account and get your API key</li>
              <li>2. Make your first API request</li>
              <li>3. Explore our endpoints and features</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Installation
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You can use our API with any HTTP client. Here are examples for
            popular languages:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                JavaScript/Node.js
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`npm install axios
// or
yarn add axios`}</code>
              </pre>
            </div>

            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Python
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`pip install requests`}</code>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "authentication",
      title: "Authentication",
      icon: Key,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All API requests require authentication using an API key. Include
            your API key in the request header.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            API Key Header
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
            <code>{`x-api-key: your_api_key_here`}</code>
          </pre>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Example Request
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
            <code>{`fetch('https://api.tavily.com/v1/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_api_key_here'
  },
  body: JSON.stringify({
    query: 'your search query'
  })
});`}</code>
          </pre>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
            <h3 className="mb-2 font-semibold text-yellow-900 dark:text-yellow-300">
              Security Best Practices
            </h3>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-400">
              <li>• Never expose your API key in client-side code</li>
              <li>• Store API keys in environment variables</li>
              <li>• Rotate your keys regularly</li>
              <li>• Use different keys for different environments</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: Code,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            API Reference
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete reference for all available API endpoints and methods.
          </p>

          <div className="space-y-6">
            {/* Search Endpoint */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-950 dark:text-green-400">
                  POST
                </span>
                <code className="text-sm text-gray-900 dark:text-white">
                  /v1/search
                </code>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Perform a search query and get AI-powered results.
              </p>

              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Request Body
              </h4>
              <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`{
  "query": "string",
  "max_results": 10,
  "include_answer": true
}`}</code>
              </pre>

              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Response
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`{
  "results": [...],
  "answer": "string",
  "query": "string"
}`}</code>
              </pre>
            </div>

            {/* Analyze Endpoint */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-950 dark:text-green-400">
                  POST
                </span>
                <code className="text-sm text-gray-900 dark:text-white">
                  /v1/analyze
                </code>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Analyze content and get insights.
              </p>

              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Request Body
              </h4>
              <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`{
  "content": "string",
  "type": "text|url"
}`}</code>
              </pre>

              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Response
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{`{
  "analysis": {...},
  "insights": [...],
  "summary": "string"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rate-limits",
      title: "Rate Limits",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Rate Limits
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our API implements rate limiting to ensure fair usage and optimal
            performance for all users.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Starter Plan
              </h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                100
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                requests per day
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Researcher Plan
              </h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                1,000
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                requests per day
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Rate Limit Headers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every API response includes rate limit information in the headers:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
            <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200`}</code>
          </pre>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <h3 className="mb-2 font-semibold text-red-900 dark:text-red-300">
              Rate Limit Exceeded
            </h3>
            <p className="text-sm text-red-800 dark:text-red-400">
              If you exceed your rate limit, you&apos;ll receive a 429 status code.
              Please wait until your limit resets or upgrade your plan.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const activeContent =
    sections.find((s) => s.id === activeSection)?.content || null;

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <BookOpen className="h-6 md:h-8 w-6 md:w-8 text-purple-600 shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Documentation
            </h1>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Complete guide to the API Key Management system
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 hidden lg:block">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1">{section.title}</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </button>
                );
              })}
            </nav>
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg lg:hidden dark:bg-gray-800 dark:border-gray-700"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>{section.title}</option>
              ))}
            </select>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-800 dark:bg-gray-950 text-sm md:text-base">
              {activeContent}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 md:mt-12 rounded-lg border border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:p-6 lg:p-8 dark:border-gray-800 dark:from-purple-950 dark:to-blue-950">
          <h2 className="mb-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Need Help?
          </h2>
          <p className="mb-4 md:mb-6 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="rounded-lg bg-purple-600 px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 whitespace-nowrap">
              Contact Support
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 whitespace-nowrap">
              Join Community
            </button>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

