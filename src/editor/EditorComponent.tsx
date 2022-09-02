import styled from "@emotion/styled";
import { EditorComponent as RemirrorEditorComponent } from "@remirror/react";
import React, { FC } from "react";
import { colors } from "../theme";

const EditorComponent: FC = () => (
  <Wrap>
    <RemirrorEditorComponent />
  </Wrap>
);

export default EditorComponent;

const Wrap = styled.div`
  .remirror-editor-wrapper > div {
    align-items: center;
    background-color: ${colors.white};
    border: 1px solid ${colors.grey2};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: ${colors.dark};
    outline: none;
    padding: 1px 10px;
    white-space: pre-wrap;
    border-top: none;
  }
`;
