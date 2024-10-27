import React, { useState } from "react";

export interface MasonryProps {
  children: React.ReactNode;
  columnsCount?: number;
  gap?: string;
  className?: string | null;
  style?: React.CSSProperties;
  containerTag?: keyof JSX.IntrinsicElements;
  itemTag?: keyof JSX.IntrinsicElements;
  itemStyle?: React.CSSProperties;
  sequential?: boolean;
}

const Masonry: React.FC<MasonryProps> = (props) => {
  const {
    children,
    columnsCount = 3,
    gap = "0",
    className = null,
    style = {},
    containerTag = "div",
    itemTag = "div",
    itemStyle = {},
    sequential = false,
  } = props;
  const [columns, setColumns] = React.useState<React.ReactNode[][]>([]);
  const [hasDistributed, setHasDistributed] = React.useState<boolean>(false);

  // Create childRefs dynamically for each child
  const childRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(
    React.Children.map(children, () => React.createRef<HTMLDivElement>()) || []
  );

  //Distribute children on mount and when children or columnsCount changes
  React.useEffect(() => {
    const columns: React.ReactNode[][] = Array.from(
      { length: columnsCount },
      () => []
    );
    let validIndex = 0;

    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        columns[validIndex % columnsCount].push(
          <div
            style={{ display: "flex", justifyContent: "stretch" }}
            key={validIndex}
            ref={childRefs.current[validIndex]}
          >
            {child}
          </div>
        );
        validIndex++;
      }
    });
    setColumns(columns);
    setHasDistributed(false);
  }, [children, columnsCount]);

  // Distribute children only if necessary
  React.useEffect(() => {
    if (!hasDistributed && !sequential) {
      distributeChildren();
    }
  }, [hasDistributed, sequential]);

  const distributeChildren = (): void => {
    const columnHeights = Array(columnsCount).fill(0);

    const isReady = childRefs.current.every(
      (ref) => ref.current && ref.current.getBoundingClientRect().height
    );

    if (!isReady) return;

    const columns: React.ReactNode[][] = Array.from(
      { length: columnsCount },
      () => []
    );
    let validIndex = 0;

    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        const childHeight =
          childRefs.current[validIndex].current?.getBoundingClientRect()
            .height || 0;
        const minHeightColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        );
        columnHeights[minHeightColumnIndex] += childHeight;
        columns[minHeightColumnIndex].push(child);
        validIndex++;
      }
    });

    setColumns(columns);
    setHasDistributed(true);
  };
  const renderColumns = (): React.ReactNode => {
    return columns.map((column, i) =>
      React.createElement(
        itemTag,
        {
          key: i,
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "stretch",
            flex: 1,
            width: 0,
            gap: gap,
            ...itemStyle,
          },
        },
        column.map((item) => item)
      )
    );
  };

  return React.createElement(
    containerTag,
    {
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "stretch",
        boxSizing: "border-box",
        width: "100%",
        gap: gap,
        ...style,
      },
      className,
    },
    renderColumns()
  );
};
export default Masonry;
