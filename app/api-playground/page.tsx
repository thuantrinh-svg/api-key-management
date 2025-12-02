"use client";

import { useState } from "react";
import { Code } from "lucide-react";
import { useApiKeys } from "../hooks/useApiKeys";
import DashboardLayout from "../dashboard-layout";
import { toast } from "sonner";
import { RequestPanel } from "./components/RequestPanel";
import { ResponsePanel } from "./components/ResponsePanel";
import { CodeExample } from "./components/CodeExample";

export default function ApiPlayground() {
  const { apiKeys } = useApiKeys();
  const [selectedKey, setSelectedKey] = useState("");
  const [endpoint, setEndpoint] = useState("/api/github-summarizer");
  const [method, setMethod] = useState("POST");
  const [requestBody, setRequestBody] = useState(
    JSON.stringify({ githubUrl: "https://github.com/vercel/next.js" }, null, 2),
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
        setResponse(
          JSON.stringify({ error: data.error || "Request failed" }, null, 2),
        );
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

  const copyCode = () => {
    const code = generateCodeExample();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const generateCodeExample = () => {
    return `// JavaScript/Node.js Example
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

          {/* Layout: Stack on mobile, Grid on desktop */}
          <div className="grid gap-6 lg:grid-cols-2 auto-rows-max lg:auto-rows-auto">
            {/* Request Panel */}
            <div className="lg:max-h-screen lg:overflow-y-auto">
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

              {/* Code Example - Show below request on mobile, alongside response on desktop */}
              <div className="mt-6 md:mt-0 lg:hidden">
                <CodeExample
                  endpoint={endpoint}
                  method={method}
                  selectedKey={selectedKey}
                  requestBody={requestBody}
                  onCopy={copyCode}
                  copied={copiedCode}
                />
              </div>
            </div>

            {/* Response Panel */}
            <div className="flex flex-col gap-6 lg:max-h-screen lg:overflow-y-auto">
              <ResponsePanel
                response={response}
                isLoading={isLoading}
                onCopy={copyResponse}
                copied={copiedResponse}
              />

              {/* Code Example - Show on desktop */}
              <div className="hidden lg:block">
                <CodeExample
                  endpoint={endpoint}
                  method={method}
                  selectedKey={selectedKey}
                  requestBody={requestBody}
                  onCopy={copyCode}
                  copied={copiedCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
