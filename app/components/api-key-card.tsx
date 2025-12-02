"use client";

import { cn } from "@/app/lib/utils";

interface ApiKeyCardProps {
  planName?: string;
  usageCount?: number;
  usageLimit?: number;
}

export function ApiKeyCard({
  planName = "Researcher",
  usageCount = 24,
  usageLimit = 1000,
}: ApiKeyCardProps) {
  const usagePercentage = (usageCount / usageLimit) * 100;

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6 text-white shadow-lg">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">CURRENT PLAN</p>
            <h2 className="mt-1 text-3xl font-bold">{planName}</h2>
          </div>
          <button className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30">
            Manage Plan
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">API Limit</span>
            <span className="font-semibold">
              {usageCount} / {usageLimit.toLocaleString()} Requests
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
            <div
              className={cn(
                "h-full rounded-full bg-white transition-all duration-300",
                usagePercentage > 80 && "bg-yellow-300",
                usagePercentage > 95 && "bg-red-300"
              )}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

