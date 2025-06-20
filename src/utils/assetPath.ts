/**
 * Returns the correct path for assets based on environment
 * @param path - The asset path without leading slash
 * @returns The complete asset path
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/pidebypide' : '';
  // Ensure path doesn't start with a slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${basePath}/${cleanPath}`;
}
