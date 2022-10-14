import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeBlockExtension } from "remirror/extensions";
import ImgCodeBlock from "../assets/icons/CodeBlock";
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
  const { toggleCodeBlock } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.codeBlock() })}
      disabled={!toggleCodeBlock.enabled({ language, wrap })}
      onClick={() => {
        toggleCodeBlock({ language, wrap });
        focus();
      }}
    >
      <ImgCodeBlock />
    </ToolbarButton>
  );
};

export { CodeBlockButton, CodeBlockExtension };
