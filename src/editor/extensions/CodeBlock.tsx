import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeBlockExtension } from "remirror/extensions";
import CodeBlockIcon from "../assets/icons/CodeBlock";
import { ToolbarButton } from "../components";

interface ICodeBlockButtonProps {
  language?: string;
}

const CodeBlockButton: FC<ICodeBlockButtonProps> = ({
  language = "typescript",
}) => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.codeBlock() })}
      disabled={!commands.toggleCodeBlock.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        active.codeBlock()
          ? commands.toggleCodeBlock()
          : commands.toggleCodeBlock({ language });
      }}
    >
      <CodeBlockIcon />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
