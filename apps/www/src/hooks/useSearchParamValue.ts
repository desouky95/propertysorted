import { useSearchParams } from "next/navigation";

export function useSearchParamValue(key: string) {
  const searchParams = useSearchParams();
  return searchParams.get(key);
}
