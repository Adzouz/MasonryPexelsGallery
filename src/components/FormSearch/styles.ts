import styled from "styled-components";
import { Button } from "../../pages/styles";

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto 0;
  width: 100%;
  max-width: 480px;
`;

export const FieldText = styled.input`
  display: block;
  color: var(--color-highlight);
  border: 2px solid var(--color-text);
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  appearance: none;
  background-color: transparent;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 16px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding: 16px 32px;
    font-size: 18px;
  }
`;

export const FormButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
`;
