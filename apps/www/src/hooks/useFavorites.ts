import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
export function useFavorites() {
  
  useEffect(() => {}, []);

  const [favs, setFavs] = useLocalStorage<number[]>("favs", []);

  const add = (id: number) => {
    if (favs.find((_) => _ === id)) return;
    setFavs((prev) => [...prev, id]);
  };

  const remove = (id: number) => {
    const index = favs.findIndex((_) => _ === id);
    if (index === -1) return;
    const new_favs = favs;
    new_favs.splice(index, 1);
    setFavs(new_favs);
  };

  return [favs, add, remove] as const;
}
