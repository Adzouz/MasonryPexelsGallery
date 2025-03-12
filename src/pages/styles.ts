import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const buttonStyles = css`
  display: inline-block;
  color: var(--color-text);
  border: 2px solid var(--color-text);
  border-radius: 32px;
  appearance: none;
  background-color: transparent;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition:
    0.2s background-color ease-in-out,
    0.2s border-color ease-in-out,
    0.2s outline-color ease-in-out;

  @media screen and (min-width: 768px) {
    padding: 16px 32px;
    font-size: 18px;
  }

  &:hover,
  &:focus-visible {
    background-color: var(--color-highlight);
    border-color: var(--color-highlight);
    outline: none;
  }
`;

export const Button = styled.button`
  ${buttonStyles};
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles};
`;

export const ExternalLink = styled.a`
  color: var(--color-highlight);
  display: inline-flex;
  align-items: center;
  transition: 0.2s all ease-in-out;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -4px;
    bottom: -2px;
    width: 0;
    z-index: -1;
    background-color: var(--color-highlight);
    transition: 0.2s all ease-in-out;
    border-radius: 4px;
  }
  svg {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    transition: 0.2s stroke ease-in-out;
    stroke: var(--color-highlight);
  }
  &:hover {
    color: var(--color-background);

    svg {
      stroke: var(--color-background);
    }
    &::before {
      width: calc(100% + 8px);
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const PageContent = styled.div`
  margin-top: 16px;
`;

export const HighlightNumber = styled.span`
  font-family: var(--font-primary);
  color: var(--color-highlight);
`;

export const LoaderContainer = styled.div`
  margin-top: 32px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
