"use client";
export function useLockBody() {
  const lock = () => {
    document.body.style.overflowY = "hidden";
  };
  const unlock = () => {
    document.body.style.overflowY = "unset";
  };

  return [lock, unlock] as const;
}
