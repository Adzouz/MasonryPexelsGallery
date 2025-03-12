// Types
import type { PositionInfo } from "../../types";
import type { Photo } from "pexels";

// Libraries
import React from "react";

// Components
import LazyImage from "../LazyImage";

// Styles
import { ItemContainer, ImageLink } from "./styles";

interface GridItemProps {
  photo: Photo;
  positionInfo: PositionInfo;
}

const GridItem = React.memo(({ photo, positionInfo }: GridItemProps) => {
  const { top, left, width, height } = positionInfo;
  return (
    <ItemContainer style={{ width, height, top, left }}>
      <ImageLink to={`/details/${photo.id}`}>
        <LazyImage src={photo.src.large} alt={photo.alt || ""} />
      </ImageLink>
    </ItemContainer>
  );
});

export default GridItem;
