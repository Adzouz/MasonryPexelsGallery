// Types
import type { PhotoProps, PositionInfo } from "../../types";

// Libraries
import React from "react";

// Components
import LazyImage from "../LazyImage";

// Styles
import { ItemContainer, ImageWrapper } from "./styles";

interface GridItemProps {
  photo: PhotoProps;
  positionInfo: PositionInfo;
}

const GridItem = React.memo(({ photo, positionInfo }: GridItemProps) => {
  const { top, left, width, height } = positionInfo;
  return (
    <ItemContainer style={{ width, height, top, left }}>
      <ImageWrapper>
        <LazyImage src={photo.src} alt={photo.alt} />
      </ImageWrapper>
    </ItemContainer>
  );
});

export default GridItem;
