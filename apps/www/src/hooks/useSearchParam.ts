import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

type UseSearchParamArgs = {
  autoNavigate?: boolean;
};
export function useSearchParam(args?: UseSearchParamArgs) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (newParams: URLSearchParams) => {
      const params = new URLSearchParams({
        ...Object.fromEntries(newParams),
      });
      if (args?.autoNavigate) router.push(`${pathname}?${params.toString()}`);
      return params.toString();
    },
    [searchParams]
  );

  const navigate = useCallback(
    (params: string) => {
      router.push(`${pathname}?${params}`);
    },
    [searchParams, pathname]
  );
  return [
    new URLSearchParams(searchParams.toString()),
    createQueryString,
    navigate,
  ] as const;
}
