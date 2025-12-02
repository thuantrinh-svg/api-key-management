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
        2,
      ),
    );
  };

  const selectedKeyObject = apiKeys.find((k) => k.key === selectedKey);

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-950">
        <button
          onClick={handleGithubTabClick}
          className={`flex items-center justify-center gap-2 flex-1 rounded-lg px-3 py-2 transition-colors text-sm font-medium ${
            activeTab === "github"
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          }`}
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </button>
        <button
          onClick={() => onActiveTabChange("custom")}
          className={`flex items-center justify-center gap-2 flex-1 rounded-lg px-3 py-2 transition-colors text-sm font-medium ${
            activeTab === "custom"
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          }`}
        >
          <Code className="h-4 w-4" />
          <span>Custom</span>
        </button>
      </div>

      {/* API Key Selection - Compact */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          API Key{" "}
          {selectedKey && (
            <span className="text-green-600 dark:text-green-400">✓</span>
          )}
        </label>
        <select
          value={selectedKey}
          onChange={(e) => onSelectedKeyChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="">Select a key...</option>
          {apiKeys.map((key) => (
            <option key={key.id} value={key.key}>
              {key.name} ({key.usage_count}/{key.limit})
            </option>
          ))}
        </select>

        {/* Inline Quota Display - Only show when key selected */}
        {selectedKeyObject && (
          <div className="mt-3 space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Usage:</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                {selectedKeyObject.usage_count} / {selectedKeyObject.limit}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  selectedKeyObject.usage_count / selectedKeyObject.limit < 0.5
                    ? "bg-green-500"
                    : selectedKeyObject.usage_count / selectedKeyObject.limit <
                        0.8
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(
                    (selectedKeyObject.usage_count / selectedKeyObject.limit) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {selectedKeyObject.limit - selectedKeyObject.usage_count}{" "}
              remaining
            </div>
          </div>
        )}

        {!selectedKey && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            ⚠️ Required to execute requests
          </p>
        )}
      </div>

      {/* HTTP Method - Only for custom tab */}
      {activeTab === "custom" && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Method
          </label>
          <div className="flex flex-wrap gap-2">
            {["GET", "POST", "PUT", "DELETE"].map((m) => (
              <button
                key={m}
                onClick={() => onMethodChange(m)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
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
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Endpoint
          </label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => onEndpointChange(e.target.value)}
            placeholder="/api/example"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
      )}

      {/* Request Body */}
      {method !== "GET" && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Body (JSON)
          </label>
          <textarea
            value={requestBody}
            onChange={(e) => onRequestBodyChange(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white resize-vertical"
          />
        </div>
      )}

      {/* Execute Button - Always visible at bottom */}
      <button
        onClick={onExecute}
        disabled={isLoading || !selectedKey}
        className="w-full rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 text-sm"
      >
        {isLoading ? "Executing..." : "Execute Request"}
      </button>
    </div>
  );
}
