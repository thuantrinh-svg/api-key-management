import { NextResponse } from "next/server";
import { summarizeReadme } from "./chain";
import { getRepoInfo } from "@/app/lib/githubUtils";
import { validateApiKey, incrementApiKeyUsage } from "@/app/lib/apiKeyUtils";

export async function POST(request: Request) {
  try {
    const { githubUrl, apiKey } = await request.json();

    if (!githubUrl || typeof githubUrl !== "string") {
      return NextResponse.json(
        { error: "GitHub URL is required" },
        { status: 400 },
      );
    }

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 },
      );
    }

    // Validate GitHub URL format
    if (!githubUrl.includes("github.com")) {
      return NextResponse.json(
        {
          error: "Invalid GitHub URL. Expected: https://github.com/owner/repo",
        },
        { status: 400 },
      );
    }

    // Validate API key and get its data
    const apiKeyData = await validateApiKey(apiKey);

    if (!apiKeyData) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Check if usage limit is reached
    const { success, message } = await incrementApiKeyUsage(apiKeyData);

    if (!success) {
      return NextResponse.json({ error: message }, { status: 429 });
    }

    // Fetch repository information
    const repoInfo = await getRepoInfo(githubUrl);

    // Summarize README using LangChain
    const summary = await summarizeReadme(repoInfo.readmeContent);

    return NextResponse.json(
      {
        ...summary,
        repository: {
          stars: repoInfo.stars,
          latestVersion: repoInfo.latestVersion,
          websiteUrl: repoInfo.websiteUrl,
          licenseType: repoInfo.licenseType,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GitHub summarizer:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
