import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { NodeFormattingExtension } from "remirror/extensions";
import AlignCenter from "../assets/icons/AlignCenter";
import AlignLeft from "../assets/icons/AlignLeft";
import AlignRight from "../assets/icons/AlignRight";
import { ToolbarButton } from "../components";

export const AlignName = "align";

export type AlignAttrs = Record<string, never>;

const AlignButtons: FC<AlignAttrs> = () => {
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
    </>
  );
};

export { AlignButtons, NodeFormattingExtension };
