import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { UnderlineExtension } from "remirror/extensions";
import UnderlineIcon from "../icons/Underline";
import { ToolbarButton } from "../components";

export const UnderlineName = "underline";

export type UnderlineAttrs = Record<string, never>;

const UnderlineButton: FC<UnderlineAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={cx({ active: active.underline() })}
      disabled={!commands.toggleUnderline.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleUnderline();
      }}
    >
      <UnderlineIcon />
    </ToolbarButton>
  );
};

export { UnderlineButton, UnderlineExtension };
