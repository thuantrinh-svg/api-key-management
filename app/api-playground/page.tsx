"use client";

import { useState } from "react";
import { Code, Play, Copy, Check, Github } from "lucide-react";
import { useApiKeys } from "../hooks/useApiKeys";
import { toast } from "sonner";

export default function ApiPlayground() {
  const { apiKeys } = useApiKeys();
  const [selectedKey, setSelectedKey] = useState("");
  const [endpoint, setEndpoint] = useState("/api/github-summarizer");
  const [method, setMethod] = useState("POST");
  const [requestBody, setRequestBody] = useState(
    JSON.stringify({ githubUrl: "https://github.com/vercel/next.js" }, null, 2)
  );
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [activeTab, setActiveTab] = useState<"custom" | "github">("github");

  const handleExecute = async () => {
    if (!selectedKey) {
      toast.error("Please select an API key");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      let body: string;
      try {
        body = JSON.stringify(JSON.parse(requestBody));
      } catch {
        toast.error("Invalid JSON in request body");
        setIsLoading(false);
        return;
      }

      const apiResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": selectedKey,
        },
        body: method !== "GET" ? body : undefined,
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        setResponse(JSON.stringify({ error: data.error || "Request failed" }, null, 2));
        toast.error(data.error || "Request failed");
      } else {
        setResponse(JSON.stringify(data, null, 2));
        toast.success("Request successful!");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResponse(JSON.stringify({ error: errorMessage }, null, 2));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeExample = () => {
    const code = `// JavaScript/Node.js Example
const response = await fetch('http://localhost:3000${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${selectedKey || "YOUR_API_KEY"}'
  },${
    method !== "GET"
      ? `
  body: JSON.stringify(${requestBody})`
      : ""
  }
});

const data = await response.json();
console.log(data);`;

    return code;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCodeExample());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              API Playground
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test and explore the API with an interactive playground. Try
            different endpoints and see live responses.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-950">
              <button
                onClick={() => {
                  setActiveTab("github");
                  setEndpoint("/api/github-summarizer");
                  setMethod("POST");
                  setRequestBody(
                    JSON.stringify(
                      { githubUrl: "https://github.com/vercel/next.js" },
                      null,
                      2
                    )
                  );
                }}
                className={`flex items-center gap-2 flex-1 rounded-lg px-4 py-2 transition-colors ${
                  activeTab === "github"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                }`}
              >
                <Github className="h-4 w-4" />
                GitHub Summarizer
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`flex items-center gap-2 flex-1 rounded-lg px-4 py-2 transition-colors ${
                  activeTab === "custom"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                }`}
              >
                <Code className="h-4 w-4" />
                Custom
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
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
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">Select an API key</option>
                  {apiKeys.map((key) => (
                    <option key={key.id} value={key.key}>
                      {key.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Method Selection - Only for custom tab */}
              {activeTab === "custom" && (
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    HTTP Method
                  </label>
                  <div className="flex gap-2">
                    {["GET", "POST", "PUT", "DELETE"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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
                    onChange={(e) => setEndpoint(e.target.value)}
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
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
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
                    Enter a GitHub repository URL and get an AI-powered summary of the README, including interesting facts and repository metadata.
                  </p>
                  <p className="mt-2 text-sm font-mono text-blue-800 dark:text-blue-400">
                    Example: https://github.com/vercel/next.js
                  </p>
                </div>
              )}

              {/* Execute Button */}
              <button
                onClick={handleExecute}
                disabled={isLoading || !selectedKey}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-5 w-5" />
                {isLoading ? "Executing..." : "Execute Request"}
              </button>
            </div>

            {/* Code Example */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Code Example
                </h2>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{generateCodeExample()}</code>
              </pre>
            </div>
          </div>

          {/* Response Panel */}
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Response
                </h2>
                {response && (
                  <button
                    onClick={copyResponse}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {copiedResponse ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {response ? (
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                  <code>{response}</code>
                </pre>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 dark:border-gray-700">
                  {isLoading
                    ? "Executing request..."
                    : "Response will appear here"}
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                <li>• Select an API key from your dashboard</li>
                <li>• Choose the HTTP method for your request</li>
                <li>• Enter the endpoint you want to test</li>
                <li>• Add request body for POST/PUT requests</li>
                <li>• Click Execute to see the response</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

