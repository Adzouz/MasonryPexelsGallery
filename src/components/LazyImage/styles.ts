import styled, { css } from "styled-components";

interface ImageProps {
  $isLoaded: boolean;
}

export const Image = styled.img<ImageProps>`
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  max-width: 100%;

  ${({ $isLoaded }) =>
    $isLoaded &&
    css`
      opacity: 1;
    `}
`;
