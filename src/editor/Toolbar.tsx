import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../theme";

interface IToolbarProps {
  handlers: JSX.Element[][];
}

export const height = 40; // px

const Toolbar: FC<IToolbarProps> = ({ handlers }) => (
  <Wrap>
    {handlers.map((elements, index) => (
      <div key={index}>
        {elements}
        {index < handlers.length - 1 && <Divider />}
      </div>
    ))}
  </Wrap>
);

export default Toolbar;

const Divider = styled.div`
  margin: 2px;
`;

const Wrap = styled.div`
  align-items: center;
  background-color: ${colors.grey5};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${colors.dark};
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  position: relative;

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;
