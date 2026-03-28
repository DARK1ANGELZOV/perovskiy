import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repoName = "perovskiy"
const basePath = isGithubActions ? `/${repoName}` : ""
const rootDir = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CONTACT_ENDPOINT:
      "https://script.google.com/macros/s/AKfycbwAWZrpCQ59CTQej6ITSZ3FQfckZTOZ9_yz-v1YmVI9XYzSM7zU8AQ0B9dbBu3jp5m9/exec",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: rootDir,
  },
}

export default nextConfig
