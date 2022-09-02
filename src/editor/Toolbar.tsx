import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../theme";

interface IToolbarProps {
  handlers: JSX.Element[][];
}

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

export const height = 40; // px

export default Toolbar;

const Divider = styled.div`
  border-right: 2px solid ${colors.grey2};
  margin: ${height/2 - 5}px 5px;
`;

const Wrap = styled.div`
  align-items: center;
  background-color: ${colors.grey4};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${colors.dark};
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  position: relative;

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;
