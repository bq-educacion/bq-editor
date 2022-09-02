import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { colors } from "../theme";

export type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  cta?: boolean;
  danger?: boolean;
  secondary?: boolean;
};

const Button = styled.button<IButtonProps>`
  background-color: ${colors.dark};
  border: 1px solid ${colors.dark};
  border-radius: 4px;
  color: ${colors.white};
  cursor: pointer;
  font-weight: bold;
  min-height: 40px;
  padding: 10px 20px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${colors.grey1};
    border: 1px solid ${colors.grey1};
  }

  &:disabled {
    background-color: ${colors.grey5};
    border: 1px solid ${colors.grey5};
    color: ${colors.grey4};
    pointer-events: none;
  }

  ${(props) =>
    props.cta &&
    css`
      background-color: ${colors.green2};
      border: 1px solid ${colors.green2};

      &:hover {
        background-color: ${colors.green3};
        border: 1px solid ${colors.green3};
      }
    `}

  ${(props) =>
    props.danger &&
    css`
      background-color: ${colors.red2};
      border: 1px solid ${colors.red2};

      &:hover {
        background-color: ${colors.red3};
        border: 1px solid ${colors.red3};
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      background-color: ${colors.grey3};
      border: 1px solid ${colors.grey3};

      &:hover {
        background-color: ${colors.white};
        border: 1px solid ${colors.dark};
        color: ${colors.dark};
      }
    `}
`;

export default Button;
