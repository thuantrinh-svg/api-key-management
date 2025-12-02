"use client";

import { useState } from "react";
import { Search, Sparkles, TrendingUp, Users, GitBranch } from "lucide-react";

export default function ResearchAssistant() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const exampleQueries = [
    "Analyze React performance optimization techniques",
    "Compare Next.js vs Remix framework",
    "Best practices for TypeScript in 2024",
    "AI-powered code review tools",
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Research Assistant
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered research assistant to help you discover insights,
            analyze trends, and make data-driven decisions.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything... e.g., 'What are the latest trends in AI?'"
                className="w-full rounded-lg border border-gray-300 bg-white py-4 pl-12 pr-32 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                disabled={isSearching}
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {/* Example Queries */}
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Try these examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(example)}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-purple-500 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-purple-500 dark:hover:bg-purple-950"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              AI-Powered Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get intelligent analysis and recommendations powered by advanced
              AI models.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Trend Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover emerging trends and patterns in your research domain.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Community Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn from community discussions and expert opinions.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950">
              <GitBranch className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Code Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyze code repositories and get actionable recommendations.
            </p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The Research Assistant is currently under development. Stay tuned
            for powerful AI-driven research capabilities!
          </p>
        </div>
      </div>
    </div>
  );
}

