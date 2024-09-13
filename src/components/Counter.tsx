import React, { FC } from "react";
import { colors } from "../theme";
import styled from "@emotion/styled";

interface ICounterProps {
  maxLength: number;
  length: number;
}

const Counter: FC<ICounterProps> = ({ maxLength, length }) => (
  <Indicator color={length < maxLength ? "inherit" : colors.red2}>
    <span>{`${length} / ${maxLength}`}</span>
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
