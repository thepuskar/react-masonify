import { ColumnsCountBreakPoints } from "lib/components/MasonryResponsive";
import { useMemo } from "react";

const DEFAULT_COLUMNS_COUNT = 1;

/**
 * Custom hook that determines the number of columns based on the window width and specified breakpoints.
 * This hook uses responsive breakpoints to calculate the optimal column count for displaying content,
 * updating dynamically as the window width changes.
 *
 * @param {number} windowWidth - The current width of the window.
 * @param {ColumnsCountBreakPoints} columnsCountBreakPoints - An object defining breakpoints (in pixels)
 * and corresponding column counts, where keys are breakpoints and values are the number of columns to display.
 *
 * @returns {number} The calculated number of columns based on the closest breakpoint for the given window width.
 */
export const useColumnsCount = (
  windowWidth: number,
  columnsCountBreakPoints: ColumnsCountBreakPoints
): number => {
  return useMemo(() => {
    const breakPoints = Object.keys(columnsCountBreakPoints)
      .map(Number)
      .sort((a, b) => a - b);

    let count =
      breakPoints.length > 0
        ? columnsCountBreakPoints[breakPoints[0]]
        : DEFAULT_COLUMNS_COUNT;

    breakPoints.forEach((breakPoint) => {
      if (breakPoint < windowWidth) {
        count = columnsCountBreakPoints[breakPoint];
      }
    });

    return count;
  }, [windowWidth, columnsCountBreakPoints]);
};
