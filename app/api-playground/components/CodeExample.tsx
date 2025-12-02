"use client";

import { Check, Copy } from "lucide-react";

interface CodeExampleProps {
  endpoint: string;
  method: string;
  selectedKey: string;
  requestBody: string;
  onCopy: () => void;
  copied: boolean;
}

function generateCodeExample(
  endpoint: string,
  method: string,
  selectedKey: string,
  requestBody: string,
): string {
  let parsedBody: Record<string, any> = {};
  try {
    parsedBody = JSON.parse(requestBody);
  } catch {
    parsedBody = {};
  }

  // Add apiKey to body for GitHub Summarizer endpoint
  if (
    endpoint === "/api/github-summarizer" ||
    endpoint.includes("github-summarizer")
  ) {
    parsedBody.apiKey = selectedKey || "YOUR_API_KEY";
  }

  const bodyString = JSON.stringify(parsedBody, null, 2)
    .split("\n")
    .join("\n  ");

  return `// JavaScript/Node.js Example
const response = await fetch('http://localhost:3000${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },${
    method !== "GET"
      ? `
  body: JSON.stringify(${bodyString})`
      : ""
  }
});

const data = await response.json();
console.log(data);`;
}

export function CodeExample({
  endpoint,
  method,
  selectedKey,
  requestBody,
  onCopy,
  copied,
}: CodeExampleProps) {
  const code = generateCodeExample(endpoint, method, selectedKey, requestBody);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Code Example
        </h2>
        <button
          onClick={onCopy}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {copied ? (
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
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 max-h-96">
        <code>{code}</code>
      </pre>
    </div>
  );
}
