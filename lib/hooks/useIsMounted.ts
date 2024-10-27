import { useCallback, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Custom hook that returns a function to check if the component is currently mounted.
 * This is useful for avoiding memory leaks by checking component mount status
 * before performing actions like state updates on unmounted components.
 *
 * @returns {() => boolean} A callback function that returns `true` if the component is mounted, and `false` otherwise.
 *
 * @example
 * const isMounted = useIsMounted();
 *
 * useEffect(() => {
 *   if (isMounted()) {
 *     // Perform actions safely knowing the component is mounted
 *   }
 * }, []);
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
