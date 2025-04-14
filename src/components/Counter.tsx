import React, { FC } from "react";
import { colors } from "../theme";
import styled from "@emotion/styled";

interface ICounterProps {
  maxLength?: { value: number; truncate?: boolean };
  length: number;
}

const Counter: FC<ICounterProps> = ({ maxLength, length }) => (
  <Indicator
    color={
      maxLength !== undefined && length > maxLength.value
        ? colors.red2
        : "inherit"
    }
  >
    <span>
      {maxLength !== undefined ? `${length} / ${maxLength.value}` : length}
    </span>
  </Indicator>
);

export default Counter;

const Indicator = styled.div<{ color: string }>`
  position: sticky;
  top: 100%;
  text-align: end;
  height: 0;

  > span {
    color: ${(props) => props.color};
    background-color: ${colors.white};
    position: absolute;
    bottom: -2px;
    right: 0;
    padding-left: 5px;
  }
`;
