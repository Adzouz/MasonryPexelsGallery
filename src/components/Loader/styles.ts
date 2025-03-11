import styled, { keyframes } from "styled-components";

export const dotAnimation = keyframes`
  from {
    background-color: var(--color-text);
  }
  to {
    background-color: var(--color-highlight);
    transform: scale(1.2);
  }
`;

export const LoaderContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderDot = styled.span`
  background-color: var(--color-highlight);
  border-radius: 4px;
  width: 8px;
  height: 8px;
  margin: 4px;
  animation-name: ${dotAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;
