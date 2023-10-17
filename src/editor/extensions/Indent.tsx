import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { NodeFormattingExtension } from "remirror/extensions";
import IndentLeft from "../assets/icons/IndentLeft";
import IndentRigth from "../assets/icons/IndentRigth";
import { ToolbarButton } from "../components";

export const IndentName = "indent";

export type IndentAttrs = Record<string, never>;

const IndentButtons: FC<IndentAttrs> = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <>
      <ToolbarButton onClick={() => commands.increaseIndent()}>
        <IndentRigth />
      </ToolbarButton>
      <ToolbarButton onClick={() => commands.decreaseIndent()}>
        <IndentLeft />
      </ToolbarButton>
    </>
  );
};

export { IndentButtons, NodeFormattingExtension };
