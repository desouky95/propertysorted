import clsx from "clsx";
import { Reducer, useEffect, useReducer } from "react";
import { FcLike } from "react-icons/fc";
import styles from "./LikeButton.module.css";
import { useFavorites } from "@/hooks/useFavorites";
type LikeButtonProps = {
  active?: boolean;
  compound?: Compound

} & React.HTMLProps<HTMLOrSVGElement>;

export const LikeButton = ({ active = false, onClick, compound, ...props }: LikeButtonProps) => {
  const [favs, add, remove] = useFavorites();

  const isFav = !!favs.find((_) => _ === compound?.id);
  const handleLike = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onClick?.(e);
    if (!compound) return
    if (isFav) remove(compound.id);
    else add(compound.id);

  };
  const className = clsx(styles.likeButton, { [styles.isActive]: isFav });
  return (
    <>
      <FcLike className={className} onClick={handleLike} {...props} />
    </>
  );
};
