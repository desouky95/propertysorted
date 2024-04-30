export function parseFilters(searchParams: URLSearchParams) {
  return Object.entries(searchParams)
    .filter(([key]) => key.includes("filter_"))
    .map(([key, value]) => ({ key, value }));
}
