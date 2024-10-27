import { CSSProperties, ReactNode } from "react";

export interface MasonryProps {
  children: ReactNode;
  columnsCount?: number;
  gap?: string;
  className?: string | null;
  style?: CSSProperties;
  containerTag?: keyof JSX.IntrinsicElements;
  itemTag?: keyof JSX.IntrinsicElements;
  itemStyle?: CSSProperties;
  sequential?: boolean;
}

export type ColumnsCountBreakPoints = {
  [key: number]: number;
};

export interface ResponsiveMasonryProps {
  columnsCountBreakPoints?: ColumnsCountBreakPoints;
  children: ReactNode;
  className?: string | null;
  style?: CSSProperties | null;
}

export type { CSSProperties, ReactNode };
