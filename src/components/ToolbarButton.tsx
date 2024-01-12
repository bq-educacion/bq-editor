import styled from "@emotion/styled";
import { colors } from "../theme";
import React, { FC } from "react";

export type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  cta?: boolean;
  danger?: boolean;
  secondary?: boolean;
};

const Button: FC<IButtonProps> = ({ type = "button", ...props }) => (
  <StyledButton type={type} {...props} />
);

export default Button;

const StyledButton = styled.button<IButtonProps>`
  background-color: ${colors.white};
  border: none;
  cursor: pointer;
  color: ${colors.dark};
  align-items: center;
  justify-content: center;
  display: flex;
  min-height: 40px;
  width: 38px;
  padding: 0;
  outline: none;
  transition: all 0.3s ease-out;

  &.active,
  &:hover {
    background-color: ${colors.dark};
    color: ${colors.white};
  }

  &:disabled {
    color: ${colors.grey5};
    pointer-events: none;
  }
`;
