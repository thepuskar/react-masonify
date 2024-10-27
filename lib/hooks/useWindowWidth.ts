import React, { useCallback } from "react";
import { useIsMounted } from "./useIsMounted";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Custom hook that provides the current width of the window.
 * It dynamically updates the width when the window is resized.
 * This hook checks if the component is mounted to avoid memory leaks or unnecessary state updates.
 *
 * @returns {number} The current window width.
 *
 * @example
 * const width = useWindowWidth();
 * console.log("Current window width:", width);
 */
export const useWindowWidth = (): number => {
  const isMounted = useIsMounted();
  const [width, setWidth] = React.useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = useCallback(() => {
    if (!isMounted) return;
    setWidth(window.innerWidth);
  }, [isMounted]);

  useIsomorphicLayoutEffect(() => {
    if (isMounted()) {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMounted, handleResize]);

  return width;
};
