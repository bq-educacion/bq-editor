import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { ItalicExtension as BaseItalicExtension } from "remirror/extensions";
import ItalicIcon from "../icons/Italic";
import { ToolbarButton } from "../components";
import { InputRule } from "@remirror/pm/inputrules";
import { MarkPasteRule } from "@remirror/pm/paste-rules";

// Custom ItalicExtension without *...* rule
export class ItalicExtension extends BaseItalicExtension {
  createInputRules: () => InputRule[] = () => {
    const rules: (InputRule & { match?: RegExp })[] = super.createInputRules();
    return rules.filter((rule) => {
      return !(rule.match?.source || "").includes("*");
    });
  };
  createPasteRules(): MarkPasteRule[] {
    const rules = super.createPasteRules();
    return rules.filter((rule) => {
      return !rule.regexp.source.includes("*");
    });
  }
}

export const ItalicName = "italic";
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
