import { Link } from "react-router-dom";
import styled from "styled-components";

export const ItemContainer = styled.li`
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
`;

export const ImageLink = styled(Link)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: relative;
  transition: 0.2s transform ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
