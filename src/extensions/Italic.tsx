import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { ItalicExtension as BaseItalicExtension } from "remirror/extensions";
import ItalicIcon from "../icons/Italic";
import { ToolbarButton } from "../components";

// Custom ItalicExtension without *...* rule
export class ItalicExtension extends BaseItalicExtension {
  createInputRules() {
    const rules = super.createInputRules();
    return [rules[1] || [...rules]];
  }
}

export const ItalicNname = "italic";
export type ItalicAttrs = Record<string, never>;

const ItalicButton: FC<ItalicAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={cx({ active: active.italic() })}
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

export { ItalicButton };
