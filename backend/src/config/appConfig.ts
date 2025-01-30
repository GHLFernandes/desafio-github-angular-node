import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  githubBaseUrl: process.env.GITHUB_BASE_URL || "https://api.github.com",
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN || ""
};