"use client";

import { Github, Code } from "lucide-react";
import { type ApiKey } from "@/app/lib/supabase/client";

interface RequestPanelProps {
  apiKeys: ApiKey[];
  selectedKey: string;
  endpoint: string;
  method: string;
  requestBody: string;
  activeTab: "custom" | "github";
  isLoading: boolean;
  onSelectedKeyChange: (key: string) => void;
  onEndpointChange: (endpoint: string) => void;
  onMethodChange: (method: string) => void;
  onRequestBodyChange: (body: string) => void;
  onActiveTabChange: (tab: "custom" | "github") => void;
  onExecute: () => void;
}

export function RequestPanel({
  apiKeys,
  selectedKey,
  endpoint,
  method,
  requestBody,
  activeTab,
  isLoading,
  onSelectedKeyChange,
  onEndpointChange,
  onMethodChange,
  onRequestBodyChange,
  onActiveTabChange,
  onExecute,
}: RequestPanelProps) {
  const handleGithubTabClick = () => {
    onActiveTabChange("github");
    onEndpointChange("/api/github-summarizer");
    onMethodChange("POST");
    onRequestBodyChange(
      JSON.stringify(
        { githubUrl: "https://github.com/vercel/next.js" },
        null,
        2
      )
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-950">
        <button
          onClick={handleGithubTabClick}
          className={`flex items-center justify-center gap-2 flex-1 rounded-lg px-3 md:px-4 py-2 transition-colors text-sm md:text-base ${
            activeTab === "github"
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          }`}
        >
          <Github className="h-4 w-4" />
          <span className="hidden md:inline">GitHub Summarizer</span>
          <span className="md:hidden">GitHub</span>
        </button>
        <button
          onClick={() => onActiveTabChange("custom")}
          className={`flex items-center justify-center gap-2 flex-1 rounded-lg px-3 md:px-4 py-2 transition-colors text-sm md:text-base ${
            activeTab === "custom"
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          }`}
        >
          <Code className="h-4 w-4" />
          <span>Custom</span>
        </button>
      </div>

      {/* Request Configuration */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Request Configuration
        </h2>

        {/* API Key Selection */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            API Key
          </label>
          <select
            value={selectedKey}
            onChange={(e) => onSelectedKeyChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Select an API key</option>
            {apiKeys.map((key) => (
              <option key={key.id} value={key.key}>
                {key.name}
              </option>
            ))}
          </select>
        </div>

        {/* HTTP Method - Only for custom tab */}
        {activeTab === "custom" && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              HTTP Method
            </label>
            <div className="flex flex-wrap gap-2">
              {["GET", "POST", "PUT", "DELETE"].map((m) => (
                <button
                  key={m}
                  onClick={() => onMethodChange(m)}
                  className={`rounded-lg px-3 md:px-4 py-2 text-sm font-medium transition-colors ${
                    method === m
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Endpoint - Only for custom tab */}
        {activeTab === "custom" && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Endpoint
            </label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => onEndpointChange(e.target.value)}
              placeholder="/api/example"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        )}

        {/* Request Body */}
        {method !== "GET" && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Request Body (JSON)
            </label>
            <textarea
              value={requestBody}
              onChange={(e) => onRequestBodyChange(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white resize-vertical"
            />
          </div>
        )}

        {/* GitHub Summarizer Info */}
        {activeTab === "github" && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
            <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
              GitHub Repository Summarizer
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Enter a GitHub repository URL and get an AI-powered summary of the README, including
              interesting facts and repository metadata.
            </p>
            <p className="mt-2 text-sm font-mono text-blue-800 dark:text-blue-400">
              Example: https://github.com/vercel/next.js
            </p>
          </div>
        )}

        {/* Execute Button */}
        <button
          onClick={onExecute}
          disabled={isLoading || !selectedKey}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Executing..." : "Execute Request"}
        </button>
      </div>
    </div>
  );
}
