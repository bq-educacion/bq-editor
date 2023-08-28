import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { NodeFormattingExtension } from "remirror/extensions";
import AlignCenter from "../assets/icons/AlignCenter";
import AlignLeft from "../assets/icons/AlignLeft";
import AlignRight from "../assets/icons/AlignRight";
import IndentLeft from "../assets/icons/IndentLeft";
import IndentRigth from "../assets/icons/IndentRigth";
import { ToolbarButton } from "../components";

export const NodeFormattingName = "node-formatting";

export type NodeFormattingAttrs = Record<string, never>;

const NodeFormattingButtons: FC<NodeFormattingAttrs> = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <>
      <ToolbarButton onClick={() => commands.leftAlign()}>
        <AlignLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.centerAlign()}>
        <AlignCenter />
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.rightAlign()}>
        <AlignRight />
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.decreaseIndent()}>
        <IndentLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.increaseIndent()}>
        <IndentRigth />
      </ToolbarButton>
    </>
  );
};

export { NodeFormattingButtons, NodeFormattingExtension };
