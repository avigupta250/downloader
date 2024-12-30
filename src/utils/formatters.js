export function formatVideoTitle(title) {
  return title
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
}