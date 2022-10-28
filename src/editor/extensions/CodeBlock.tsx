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
import ToolbarButton from "../ToolbarButton";

interface ICodeBlockButtonProps {
  language?: string;
  wrap?: boolean;
}

const CodeBlockButton: FC<ICodeBlockButtonProps> = ({
  language = "typescript",
  wrap,
}) => {
  const active = useActive();
  const chain = useChainedCommands();
  const { toggleCodeBlock } = useCommands();
  const { to, from } = useCurrentSelection();

  return (
    <ToolbarButton
      className={classNames({ active: active.codeBlock() })}
      disabled={!toggleCodeBlock.enabled({ language, wrap })}
      onClick={() => {
        toggleCodeBlock({ language, wrap });
        chain.focus({ to, from }).run();
      }}
    >
      <CodeBlockIcon />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
