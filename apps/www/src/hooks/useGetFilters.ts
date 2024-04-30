"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useGetFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const params = Object.entries(Object.fromEntries(searchParams))
    .filter(([key]) => key.includes("filter_"))
      .map(([key, value]) => ({ key, value }));

    return params;
  }, [pathname, searchParams]);
}
