import { useHover, useMouse } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

type UseFirstHoverArgs = () => void;
export function useFirstHover(cb: UseFirstHoverArgs) {
  const [firstHover, setFirstHover] = useState(false);
  const [ref, hovered] = useHover();

  const _ref = useRef<HTMLElement | null>(null);

  const controller = new AbortController();

  const handleMouse = () => {
    setFirstHover(true);
    cb();
    controller.abort();
  };

  const handleTouch = (e: TouchEvent) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element) {
      setFirstHover(true);
      cb();
      controller.abort();
    }
  };

  useEffect(() => {
    const element = _ref.current;
    element?.addEventListener("mouseover", handleMouse, {
      signal: controller.signal,
    });
    element?.addEventListener("touchmove", handleTouch, {
      signal: controller.signal,
    });
    return () => {
      element?.removeEventListener("mouseover", handleMouse);
      element?.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return [_ref, firstHover] as const;
}
