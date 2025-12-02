import { NextResponse } from "next/server";
import { summarizeReadme } from "./chain";
import { getRepoInfo } from "@/app/lib/githubUtils";

export async function POST(request: Request) {
  try {
    const { githubUrl } = await request.json();

    if (!githubUrl || typeof githubUrl !== "string") {
      return NextResponse.json(
        { error: "GitHub URL is required" },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    if (!githubUrl.includes("github.com")) {
      return NextResponse.json(
        { error: "Invalid GitHub URL. Expected: https://github.com/owner/repo" },
        { status: 400 }
      );
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
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GitHub summarizer:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

