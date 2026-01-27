import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { ItalicExtension as BaseItalicExtension } from "remirror/extensions";
import ItalicIcon from "../icons/Italic";
import { ToolbarButton } from "../components";
import { InputRule } from "@remirror/pm/inputrules";
import { MarkPasteRule } from "@remirror/pm/paste-rules";

type AutoFormattingOptions = {
  disableAutoFormatting?: boolean;
};

// Custom ItalicExtension without *...* rule
export class ItalicExtension extends BaseItalicExtension {
  private readonly disableAutoFormatting: boolean;

  constructor(options: AutoFormattingOptions = {}) {
    super(options as any);
    this.disableAutoFormatting = !!options.disableAutoFormatting;
  }

  createInputRules: () => InputRule[] = () => {
    if (this.disableAutoFormatting) {
      return [];
    }

    return super.createInputRules();
  };

  createPasteRules(): MarkPasteRule[] {
    if (this.disableAutoFormatting) {
      return [];
    }

    return super.createPasteRules?.() ?? [];
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
