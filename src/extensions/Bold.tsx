import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { BoldExtension } from "remirror/extensions";
import BoldIcon from "../icons/Bold";
import { ToolbarButton } from "../components";

export const BoldName = "bold";

export type BoldAttrs = Record<string, never>;

const BoldButton: FC<BoldAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={cx({ active: active.bold() })}
      disabled={!commands.toggleBold.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleBold();
      }}
    >
      <BoldIcon />
    </ToolbarButton>
  );
};

export { BoldButton, BoldExtension };
