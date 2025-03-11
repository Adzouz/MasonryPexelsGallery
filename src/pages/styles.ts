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

  @media screen and (min-width: 768px) {
    padding: 16px 32px;
    font-size: 18px;
  }
`;

export const Button = styled.button`
  ${buttonStyles};
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles};
`;

export const RequestInfo = styled.div`
  margin-top: 16px;
`;

export const HighlightNumber = styled.span`
  font-family: var(--font-primary);
  color: var(--color-highlight);
`;

export const LoaderContainer = styled.div`
  margin-top: 32px;
`;

export const ShowMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
