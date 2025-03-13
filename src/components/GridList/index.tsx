// Types
import type { Photo } from "pexels";

// Libraries
import React, { useEffect, useMemo, useState } from "react";

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
const containerMaxWidth = 1920; // Max size of the grid

interface GridListProps {
  photos: Photo[];
}

const GridList = React.memo(({ photos }: GridListProps) => {
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
    if (!photos) return [];

    const bodyElement = document.getElementsByTagName("body")[0];
    const bodyStyle = window.getComputedStyle(bodyElement);
    const containerWidth =
      viewportWidth -
      (parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight));

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
      (containerWidth <= containerMaxWidth
        ? containerWidth
        : containerMaxWidth) / nbColumnsByBreakpoint[highestBreakpoint]
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
  }, [photos, viewportWidth]);

  /**
   * Since the item in the columns will have a absolute position, we'll need to set a height on the container
   */
  const containerHeight = useMemo(() => {
    if (!columns?.length) return 0;
    const columnHeights = columns.map((item) => item.top + item.height);
    return Math.max(...columnHeights);
  }, [columns]);

  return (
    <GridContainer
      id="gridList"
      style={{ maxWidth: containerMaxWidth, height: containerHeight }}
    >
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
