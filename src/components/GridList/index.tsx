// Types
import type { PhotoProps } from "../../types";

// Libraries
import React, { useEffect, useMemo, useRef, useState } from "react";

// Components
import GridItem from "../GridItem";

// Styles
import { GridContainer } from "./styles";

// Global variables
const gapImages = 16; // In pixels
const nbColumnsByBreakpoint: {
  [key: number]: number;
} = {
  0: 2,
  768: 4,
  1024: 6,
  1440: 8,
}; // How many columns to display above each breakpoint defined as a key

interface GridListProps {
  photos: PhotoProps[];
}

const GridList = React.memo(({ photos }: GridListProps) => {
  const gridRef = useRef<HTMLUListElement>(null);

  const [viewportWidth, setViewportWidth] = useState(
    document.documentElement.clientWidth
  );

  /**
   * We will watch the resize of the window to make sure that we will recalculate the items position in the grid
   */
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setViewportWidth(document.documentElement.clientWidth);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, []);

  /**
   * Method used to generate the columns to have the Masonry effect without using any library
   */
  const columns = useMemo(() => {
    if (!photos || !gridRef?.current) return [];

    const gridWidth = gridRef.current.getBoundingClientRect().width; // Width of the container

    // We fetch the number of columns depending on the current viewport width
    const breakpointsList = Object.keys(nbColumnsByBreakpoint).map(
      (breakpoint) => parseInt(breakpoint)
    );
    const nbColumnsMatchingBreakpoints = breakpointsList.filter(
      (breakpoint) => viewportWidth >= breakpoint
    );
    const highestBreakpoint =
      nbColumnsMatchingBreakpoints.length > 0
        ? Math.max(...nbColumnsMatchingBreakpoints)
        : breakpointsList[breakpointsList.length - 1];
    const nbColumns = nbColumnsByBreakpoint[highestBreakpoint];

    const columnWidth = Math.floor(
      gridWidth / nbColumnsByBreakpoint[highestBreakpoint]
    ); // Width of each column
    const columnHeights = Array(nbColumns).fill(0); // We create 8 columns with a default height at 0

    return photos.map((photo) => {
      const aspectRatio = photo.height / photo.width; // Aspect ratio of the image
      const itemHeight = (columnWidth - gapImages) * aspectRatio; // Get image height based on ratio and column width
      const minColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights) // We'll get the column with the minimum height to add the new element
      );
      const top = columnHeights[minColumnIndex]; // Top position of the cell in the container
      columnHeights[minColumnIndex] += itemHeight + gapImages; // Add element height to the column total height

      return {
        photo,
        left: minColumnIndex * columnWidth,
        top,
        width: columnWidth,
        height: itemHeight + gapImages,
      };
    });
  }, [gridRef, photos, viewportWidth]);

  /**
   * Since the item in the columns will have a absolute position, we'll need to set a height on the container
   */
  const containerHeight = useMemo(() => {
    if (!columns?.length) return 0;
    const columnHeights = columns.map((item) => item.top + item.height);
    return Math.max(...columnHeights);
  }, [columns]);

  return (
    <GridContainer ref={gridRef} style={{ height: containerHeight }}>
      {columns?.map(({ photo, left, top, width, height }) => (
        <GridItem
          key={`photo_${photo.id}`}
          photo={photo}
          positionInfo={{
            top,
            left,
            width,
            height,
          }}
        />
      ))}
    </GridContainer>
  );
});

export default GridList;
