import styled from "styled-components";

export const DetailsContainer = styled.div`
  margin-top: 16px;

  img {
    display: block;
    margin: auto;
    border-radius: 4px;
    max-width: 100%;
  }
`;

export const AvgColorContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AvgColorProps {
  color: string;
}

export const AvgColor = styled.span<AvgColorProps>`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ color }) => color};
  margin-left: 8px;
`;
