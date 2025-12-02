"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Copy, Check, Play } from "lucide-react";
import { toast } from "sonner";

export function ApiKeyDemo() {
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(
      {
        name: "Production API Key",
        description: "Key for production environment",
      },
      null,
      2
    )
  );
  const [response, setResponse] = useState(
    JSON.stringify(
      {
        id: "key_1a2b3c4d5e",
        name: "Production API Key",
        key: "sk_live_abcdef1234567890",
        created_at: "2024-12-02T10:30:00Z",
        usage_count: 42,
        status: "active",
      },
      null,
      2
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleTryItOut = async () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/api/auth/signin");
    }
  };

  const copyToClipboard = (text: string, isResponse: boolean) => {
    navigator.clipboard.writeText(text);
    if (isResponse) {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    } else {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
      {/* Request Panel */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              API Request
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a new API key
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(requestBody, false)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            title="Copy request"
          >
            {copiedRequest ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        <textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white resize-none"
          rows={8}
          spellCheck="false"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleTryItOut}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Play className="h-4 w-4" />
            {isLoading ? "Sending..." : "Try It Out"}
          </button>
          <a
            href="/documentation"
            className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900 w-full sm:w-auto"
          >
            View Docs
          </a>
        </div>
      </div>

      {/* Response Panel */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              API Response
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Example response with key data
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(response, true)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            title="Copy response"
          >
            {copiedResponse ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        <textarea
          value={response}
          readOnly
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-none cursor-default"
          rows={8}
          spellCheck="false"
        />

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          💡 Response includes the generated API key and metadata
        </div>
      </div>
    </div>
  );
}
