import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { CodeExtension as BaseCodeExtension } from "remirror/extensions";
import CodeIcon from "../icons/Code";
import { ToolbarButton } from "../components";
import { InputRule } from "@remirror/pm/inputrules";
import { MarkPasteRule } from "@remirror/pm/paste-rules";

type AutoFormattingOptions = {
  disableAutoFormatting?: boolean;
};

export class CodeExtension extends BaseCodeExtension {
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

export const CodeName = "code";

export type CodeAttrs = Record<string, never>;

const CodeButton: FC<CodeAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={cx({ active: active.code() })}
      disabled={!commands.toggleCode.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleCode();
      }}
    >
      <CodeIcon />
    </ToolbarButton>
  );
};

export { CodeButton };
