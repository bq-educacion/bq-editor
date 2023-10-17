import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../../theme";

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
  background-color: ${colors.dark};
  border: 1px solid ${colors.dark};
  border-radius: 4px;
  color: ${colors.white};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: bold;
  min-height: 40px;
  padding: 10px 20px;
  outline: none;
  transition: all 0.3s ease-out;

  &.active,
  &:hover {
    background-color: ${colors.grey1};
    border-color: ${colors.grey1};
  }

  &:disabled {
    background-color: ${colors.grey6};
    border-color: ${colors.grey6};
    color: ${colors.grey5};
    pointer-events: none;
  }

  ${(props) =>
    props.cta &&
    css`
      background-color: ${colors.green2};
      border-color: ${colors.green2};

      &.active,
      &:hover {
        background-color: ${colors.green3};
        border-color: ${colors.green3};
      }
    `}

  ${(props) =>
    props.danger &&
    css`
      background-color: ${colors.red2};
      border-color: ${colors.red2};

      &.active,
      &:hover {
        background-color: ${colors.red3};
        border-color: ${colors.red3};
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      background-color: ${colors.grey4};
      border-color: ${colors.grey4};
      color: ${colors.dark};

      &.active,
      &:hover {
        background-color: ${colors.white};
        border-color: ${colors.dark};
      }
    `}
`;
