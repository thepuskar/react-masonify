import { useColumnsCount, useWindowWidth } from "../hooks";
import React, { CSSProperties, ReactElement } from "react";

// Types
export type ColumnsCountBreakPoints = {
  [key: number]: number;
};

interface ResponsiveMasonryProps {
  columnsCountBreakPoints?: ColumnsCountBreakPoints;
  children: React.ReactNode;
  className?: string | null;
  style?: CSSProperties | null;
}

interface ChildProps {
  columnsCount: number;
  key: number;
}

const ResponsiveMasonry: React.FC<ResponsiveMasonryProps> = ({
  columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: 3,
  },
  children,
  className = null,
  style = null,
}) => {
  const windowWidth = useWindowWidth();
  const columnsCount = useColumnsCount(windowWidth, columnsCountBreakPoints);

  return (
    <div className={className || undefined} style={style || undefined}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as ReactElement,
              {
                key: index,
                columnsCount,
              } as ChildProps
            )
          : child
      )}
    </div>
  );
};

export default ResponsiveMasonry;
