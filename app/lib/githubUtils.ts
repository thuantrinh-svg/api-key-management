/**
 * GitHub utilities for fetching public repository information
 */

interface RepoInfo {
  readmeContent: string;
  stars: number;
  latestVersion: string;
  websiteUrl: string | null;
  licenseType: string | null;
}

export async function getRepoInfo(githubUrl: string): Promise<RepoInfo> {
  // Extract owner and repo from GitHub URL
  const parts = githubUrl.split("/").filter(Boolean);
  // Support: https://github.com/owner/repo or http(s)://github.com/owner/repo
  const githubIdx = parts.findIndex((part) => part === "github.com");
  const [owner, repo] =
    githubIdx !== -1
      ? [parts[githubIdx + 1], (parts[githubIdx + 2] || "").replace(/\.git$/, "")]
      : [parts[1], (parts[2] || "").replace(/\.git$/, "")];

  if (!owner || !repo) {
    throw new Error(
      "Invalid GitHub URL. Expected: https://github.com/owner/repo"
    );
  }

  const apiBaseUrl = `https://api.github.com/repos/${owner}/${repo}`;

  // Only public information is accessed: no authentication headers sent
  const [readmeResponse, repoInfoResponse, releasesResponse] = await Promise.all([
    fetch(`${apiBaseUrl}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" },
    }),
    fetch(apiBaseUrl),
    fetch(`${apiBaseUrl}/releases/latest`),
  ]);

  if (!readmeResponse.ok || !repoInfoResponse.ok) {
    throw new Error(
      `Failed to fetch repository information: ${readmeResponse.statusText || repoInfoResponse.statusText}`
    );
  }

  const [readmeContent, repoInfo, latestRelease] = await Promise.all([
    readmeResponse.text(),
    repoInfoResponse.json(),
    releasesResponse.ok ? releasesResponse.json() : null,
  ]);

  return {
    readmeContent: readmeContent.substring(0, 8000),
    stars: repoInfo.stargazers_count || 0,
    latestVersion: latestRelease ? latestRelease.tag_name : "No releases found",
    websiteUrl: repoInfo.homepage || null,
    licenseType: repoInfo.license ? repoInfo.license.spdx_id : null,
  };
}
