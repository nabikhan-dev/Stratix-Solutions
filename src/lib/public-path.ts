export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!path || !base) return path;

  // Remote, data, and blob URLs are not files from /public.
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // CMS values may already contain the deployment base path.
  if (
    normalizedPath === base ||
    normalizedPath.startsWith(`${base}/`)
  ) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}
