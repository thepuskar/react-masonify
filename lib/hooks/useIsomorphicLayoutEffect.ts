import { useEffect, useLayoutEffect } from "react";

/**
 * A hook that conditionally uses `useLayoutEffect` on the client and `useEffect` on the server.
 * This ensures that when rendering on the server (where `window` is undefined), React does not throw a warning
 * about using `useLayoutEffect` during SSR. On the client, it behaves like `useLayoutEffect`.
 *
 * @type {React.EffectCallback} - The effect to run after rendering.
 * @returns {void}
 *
 * @example
 * useIsomorphicLayoutEffect(() => {
 *   // Code that runs after the component has rendered
 * }, [dependencies]);
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
