import parseLinks from "parse-link-header";
export const getPagination = (headers: Record<string, any>) => {
  const links = parseLinks(headers?.link || "");
  return {
    prev: (links?.prev?._page as unknown as number) || null,
    next: (links?.next?._page as unknown as number) || null,
  };
};
