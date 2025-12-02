"use client";

import { useState } from "react";
import { FileText, Calendar, Download, Eye, Filter } from "lucide-react";
import DashboardLayout from "../dashboard-layout";

type Report = {
  id: string;
  title: string;
  date: string;
  status: "completed" | "in_progress" | "draft";
  category: string;
  size: string;
};

export default function ResearchReports() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const reports: Report[] = [
    {
      id: "1",
      title: "Q4 2024 Technology Trends Analysis",
      date: "2024-12-01",
      status: "completed",
      category: "Technology",
      size: "2.4 MB",
    },
    {
      id: "2",
      title: "AI Market Research Report",
      date: "2024-11-28",
      status: "completed",
      category: "AI/ML",
      size: "3.1 MB",
    },
    {
      id: "3",
      title: "Developer Tools Comparison Study",
      date: "2024-11-25",
      status: "in_progress",
      category: "Development",
      size: "1.8 MB",
    },
    {
      id: "4",
      title: "Open Source Ecosystem Analysis",
      date: "2024-11-20",
      status: "completed",
      category: "Open Source",
      size: "4.2 MB",
    },
    {
      id: "5",
      title: "Cloud Infrastructure Trends",
      date: "2024-11-15",
      status: "draft",
      category: "Cloud",
      size: "0.9 MB",
    },
  ];

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusText = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "draft":
        return "Draft";
    }
  };

  const filteredReports =
    selectedFilter === "all"
      ? reports
      : reports.filter((report) => report.status === selectedFilter);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Research Reports
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Access and manage your research reports, analysis documents, and
            insights.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter:
            </span>
          </div>
          <div className="flex gap-2">
            {["all", "completed", "in_progress", "draft"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() +
                  filter.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
                  {getStatusText(report.status)}
                </span>
              </div>

              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {report.title}
              </h3>

              <div className="mb-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Category:</span>
                  <span>{report.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Size:</span>
                  <span>{report.size}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
                  <Eye className="h-4 w-4" />
                  View
                </button>
                {report.status === "completed" && (
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="mt-12 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No reports found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No reports match the selected filter.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {reports.filter((r) => r.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed Reports
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {reports.filter((r) => r.status === "in_progress").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
              {reports.filter((r) => r.status === "draft").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Drafts
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

