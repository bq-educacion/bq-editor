import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../theme";

interface IEditorToolbarProps {
  handlers: JSX.Element[][];
}

const EditorToolbar: FC<IEditorToolbarProps> = ({ handlers }) => (
  <Wrap>
    {handlers.map((elements, index) => (
      <div key={index}>
        {elements}
        {index < handlers.length - 1 && <Divider />}
      </div>
    ))}
  </Wrap>
);

const height = 40; // px

export default EditorToolbar;

const Divider = styled.div`
  border-right: 1px solid ${colors.grey2};
  margin: 5px;
`;

const Wrap = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid ${colors.grey2};
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

    > button,
    > select,
    > div > button,
    > div > select {
      min-height: calc(${height}px - 10px);
      margin: 5px;
      min-width: calc(${height}px - 10px);
      padding: 5px;

      &.active {
      }
    }
  }
`;
