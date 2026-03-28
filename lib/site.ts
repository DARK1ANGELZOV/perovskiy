export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbwAWZrpCQ59CTQej6ITSZ3FQfckZTOZ9_yz-v1YmVI9XYzSM7zU8AQ0B9dbBu3jp5m9/exec"

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path
  }

  return `${BASE_PATH}${path}`
}
