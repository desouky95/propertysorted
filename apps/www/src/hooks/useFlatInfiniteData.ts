import { useMemo } from "react";

type FlatInfiniteDataArgs<T> = {
  data?: T[];

  key?: string;
};

export function useFlatInfiniteData<T>({ data, key }: FlatInfiniteDataArgs<T>) {
  return useMemo(() => {
    if (!key || !data) return;
    return data?.flatMap((item) => item[key as keyof T]);
  }, [data, key]);
}
