import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { adjustColorOpacity, colors } from "../../theme";
import TickIcon from "./assets/icons/Tick";

export interface ICheckboxProps {
  className?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
  children?: React.ReactNode;
}

const Checkbox: FC<ICheckboxProps> = ({ onChange, ...props }) => {
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => setChecked(props.checked), [props.checked]);

  return (
    <Container
      {...props}
      checked={checked}
      onClick={() => (setChecked(!checked), onChange?.(!checked))}
    >
      {checked && <TickIcon />}
    </Container>
  );
};

export default Checkbox;

const Container = styled.div<{
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
}>`
  background-color: ${(props) =>
    props.checked
      ? props.error
        ? adjustColorOpacity(colors.red3, 0.22)
        : colors.turquoise2
      : colors.white};
  border: solid 1px
    ${(props) =>
      props.error
        ? colors.red3
        : props.checked
        ? colors.turquoise2
        : colors.grey3};
  border-radius: 3px;
  min-width: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${(props) => (props.error ? colors.red3 : colors.white)};
    width: 10px;
    height: 10px;
    pointer-events: none;
  }

  &:hover {
    border-color: ${(props) => (props.error ? colors.red3 : colors.dark)};
    outline: none;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.grey6};
      border-color: ${colors.grey6};
      pointer-events: none;

      svg {
        color: ${colors.grey2};
      }
    `}
`;
