import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { NodeFormattingExtension } from "remirror/extensions";
import IndentLeftIcon from "../icons/IndentLeft";
import IndentRigthIcon from "../icons/IndentRigth";
import { ToolbarButton } from "../components";

export const IndentName = "indent";

export type IndentAttrs = Record<string, never>;

const IndentButtons: FC<IndentAttrs> = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <>
      <ToolbarButton onClick={() => commands.increaseIndent()}>
        <StyledIcon>
          <IndentRigthIcon />
        </StyledIcon>
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.decreaseIndent()}>
        <StyledIcon>
          <IndentLeftIcon />
        </StyledIcon>
      </ToolbarButton>
    </>
  );
};

export { IndentButtons, NodeFormattingExtension };

const StyledIcon = styled.div`
  display: flex;

  svg {
    height: 12px;
    margin-top: 4px;
  }
`;
