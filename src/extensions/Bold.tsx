import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { BoldExtension as BaseBoldExtension } from "remirror/extensions";
import BoldIcon from "../icons/Bold";
import { ToolbarButton } from "../components";
import { InputRule } from "@remirror/pm/inputrules";
import { MarkPasteRule } from "@remirror/pm/paste-rules";

type AutoFormattingOptions = {
  disableAutoFormatting?: boolean;
};

export class BoldExtension extends BaseBoldExtension {
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

export { BoldButton };
