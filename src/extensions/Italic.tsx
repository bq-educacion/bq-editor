import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { ItalicExtension } from "remirror/extensions";
import ItalicIcon from "../icons/Italic";
import { ToolbarButton } from "../components";

export const ItalicNname = "italic";

export type ItalicAttrs = Record<string, never>;

const ItalicButton: FC<ItalicAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.italic() })}
      disabled={!commands.toggleItalic.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleItalic();
      }}
    >
      <ItalicIcon />
    </ToolbarButton>
  );
};

export { ItalicButton, ItalicExtension };
