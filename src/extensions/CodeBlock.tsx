import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { CodeBlockExtension } from "remirror/extensions";
import CodeBlockIcon from "../icons/CodeBlock";
import { ToolbarButton } from "../components";

export const CodeBlockName = "code-block";

export type CodeBlockAttrs = Record<string, never>;

const CodeBlockButton: FC = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={cx({ active: active.codeBlock() })}
      disabled={!commands.toggleCodeBlock.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleCodeBlock();
      }}
    >
      <CodeBlockIcon />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
