import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

export function usePreviousSearch(key: string) {
  useEffect(() => {}, []);
  const [previous, set] = useLocalStorage<{ id: number; name: string }[]>(
    key,
    []
  );

  const add = (item: { id: number; name: string }) => {
    if (previous.find((_) => _.id === item.id)) return;
    set((prev) => [...prev, item]);
  };
  return [previous, add] as const;
}
