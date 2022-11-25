import {
  useActive,
  useChainedCommands,
  useCommands,
  useCurrentSelection,
} from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import CodeIcon from "../assets/icons/Code";
import { ToolbarButton } from "../utils";

const CodeButton: FC = () => {
  const active = useActive();
  const chain = useChainedCommands();
  const { toggleCode } = useCommands();
  const { to, from } = useCurrentSelection();

  return (
    <ToolbarButton
      className={classNames({ active: active.code() })}
      disabled={!toggleCode.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        toggleCode();
      }}
    >
      <CodeIcon />
    </ToolbarButton>
  );
};

export { CodeButton, CodeExtension };
