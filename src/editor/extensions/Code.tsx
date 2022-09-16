import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import ToolbarButton from "../ToolbarButton";

const CodeButton: FC = () => {
  const active = useActive();
  const { toggleCode } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.code() })}
      disabled={!toggleCode.enabled()}
      onClick={() => {
        toggleCode();
        focus();
      }}
    >
      Code
    </ToolbarButton>
  );
};

export { CodeButton, CodeExtension };
