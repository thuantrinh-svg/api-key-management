"use client";

import { useState, useCallback } from "react";
import { Code } from "lucide-react";
import { useApiKeys } from "../hooks/useApiKeys";
import DashboardLayout from "../dashboard-layout";
import { toast } from "sonner";
import { RequestPanel } from "./components/RequestPanel";
import { ResponsePanel } from "./components/ResponsePanel";

export default function ApiPlayground() {
  const { apiKeys, fetchApiKeys } = useApiKeys();
  const [selectedKey, setSelectedKey] = useState("");
  const [endpoint, setEndpoint] = useState("/api/github-summarizer");
  const [method, setMethod] = useState("POST");
  const [requestBody, setRequestBody] = useState(
    JSON.stringify({ githubUrl: "https://github.com/vercel/next.js" }, null, 2),
  );
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"custom" | "github">("github");

  const handleExecute = useCallback(async () => {
    if (!selectedKey) {
      toast.error("Please select an API key");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      let parsedBody: Record<string, any>;
      try {
        parsedBody = JSON.parse(requestBody);
      } catch {
        toast.error("Invalid JSON in request body");
        setIsLoading(false);
        return;
      }

      // Add apiKey to the request body for GitHub Summarizer endpoint
      if (
        endpoint === "/api/github-summarizer" ||
        endpoint.includes("github-summarizer")
      ) {
        parsedBody.apiKey = selectedKey;
      }

      const body = JSON.stringify(parsedBody);

      const apiResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? body : undefined,
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        setResponse(
          JSON.stringify({ error: data.error || "Request failed" }, null, 2),
        );
        toast.error(data.error || "Request failed");
      } else {
        setResponse(JSON.stringify(data, null, 2));
        toast.success("Request successful!");

        // Refresh API keys to update quota display in real-time
        await fetchApiKeys();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResponse(JSON.stringify({ error: errorMessage }, null, 2));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedKey, requestBody, endpoint, method, fetchApiKeys]);

  const generateCodeExample = () => {
    let parsedBody: Record<string, any> = {};
    try {
      parsedBody = JSON.parse(requestBody);
    } catch {
      parsedBody = {};
    }

    // Add apiKey to code example for GitHub Summarizer
    if (
      endpoint === "/api/github-summarizer" ||
      endpoint.includes("github-summarizer")
    ) {
      parsedBody.apiKey = selectedKey || "YOUR_API_KEY";
    }

    return `// JavaScript/Node.js Example
const response = await fetch('http://localhost:3000${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },${
    method !== "GET"
      ? `
  body: JSON.stringify(${JSON.stringify(parsedBody, null, 2).split("\n").join("\n  ")})`
      : ""
  }
});

const data = await response.json();
console.log(data);`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCodeExample());
    toast.success("Code copied to clipboard!");
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Code className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                API Playground
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Test and explore the API with an interactive playground. Try
              different endpoints and see live responses.
            </p>
          </div>

          {/* Main Layout: 3 columns on desktop, stacked on mobile */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Request Panel - Left Column (1/3) */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <RequestPanel
                  apiKeys={apiKeys}
                  selectedKey={selectedKey}
                  endpoint={endpoint}
                  method={method}
                  requestBody={requestBody}
                  activeTab={activeTab}
                  isLoading={isLoading}
                  onSelectedKeyChange={setSelectedKey}
                  onEndpointChange={setEndpoint}
                  onMethodChange={setMethod}
                  onRequestBodyChange={setRequestBody}
                  onActiveTabChange={setActiveTab}
                  onExecute={handleExecute}
                />
              </div>
            </div>

            {/* Response Panel - Right Column (2/3) */}
            <div className="lg:col-span-2">
              <div className="sticky top-6 space-y-6">
                {/* Response Section */}
                <ResponsePanel
                  response={response}
                  isLoading={isLoading}
                  onCopy={copyResponse}
                  copied={false}
                />

                {/* Code Example - Collapsible section */}
                <details className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 group">
                  <summary className="cursor-pointer flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform inline-block">
                        ▶
                      </span>
                      Code Example
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        copyCode();
                      }}
                      className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      📋 Copy
                    </button>
                  </summary>
                  <div className="mt-4">
                    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100 max-h-96">
                      <code>{generateCodeExample()}</code>
                    </pre>
                  </div>
                </details>

                {/* Curl Example - Collapsible section */}
                <details className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 group">
                  <summary className="cursor-pointer flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform inline-block">
                        ▶
                      </span>
                      Curl Example
                    </span>
                  </summary>
                  <div className="mt-4">
                    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
                      <code>{`curl -X ${method} http://localhost:3000${endpoint} \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify({ ...JSON.parse(requestBody), apiKey: "YOUR_API_KEY" }, null, 2)}'`}</code>
                    </pre>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
