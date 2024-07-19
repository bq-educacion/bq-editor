import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import CodeIcon from "../icons/Code";
import { ToolbarButton } from "../components";

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

export { CodeButton, CodeExtension };
