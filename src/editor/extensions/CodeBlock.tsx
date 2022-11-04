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
        active.codeBlock() ? toggleCodeBlock() : toggleCodeBlock({ language });
        chain.focus({ to, from }).run();
      }}
    >
      <CodeBlockIcon />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
