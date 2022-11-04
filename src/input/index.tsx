import styled from "@emotion/styled";
import React from "react";
import { adjustColorOpacity, colors } from "../theme";

export type IInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default styled.input<IInputProps>`
  background-color: ${(props) =>
    props.error ? adjustColorOpacity(colors.red3, 0.22) : colors.white};
  border: solid 1px ${(props) => (props.error ? colors.red3 : colors.grey3)};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => (props.error ? colors.red3 : colors.dark)};
  height: 40px;
  padding: 10px 20px 10px;
  width: 100%;

  &::placeholder {
    color: ${(props) => (props.error ? colors.red3 : colors.grey3)};
    font-style: italic;
  }

  &:focus {
    border-color: ${(props) => (props.error ? colors.red3 : colors.dark)};
    outline: none;
  }

  &:disabled {
    background-color: ${colors.grey6};
    border-color: ${colors.grey4};
    pointer-events: none;
  }
`;
