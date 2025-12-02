"use client";

import { Check, Copy } from "lucide-react";

interface ResponsePanelProps {
  response: string;
  isLoading: boolean;
  onCopy: () => void;
  copied: boolean;
}

export function ResponsePanel({
  response,
  isLoading,
  onCopy,
  copied,
}: ResponsePanelProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Response Display */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Response
          </h2>
          {response && (
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
          )}
        </div>

        {response ? (
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400 max-h-96">
            <code>{response}</code>
          </pre>
        ) : (
          <div className="flex h-48 md:h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 dark:border-gray-700 text-sm md:text-base">
            {isLoading
              ? "Executing request..."
              : "Response will appear here"}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-6 dark:border-blue-900 dark:bg-blue-950">
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
  );
}
