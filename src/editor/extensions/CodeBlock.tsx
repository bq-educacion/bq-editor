import {
  useActive,
  useChainedCommands,
  useCommands,
  useCurrentSelection,
} from "@remirror/react";
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
  const active = useActive();
  const chain = useChainedCommands();
  const { toggleCodeBlock } = useCommands();
  const { to, from } = useCurrentSelection();

  return (
    <ToolbarButton
      className={classNames({ active: active.codeBlock() })}
      disabled={!toggleCodeBlock.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        active.codeBlock() ? toggleCodeBlock() : toggleCodeBlock({ language });
      }}
    >
      <CodeBlockIcon />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
