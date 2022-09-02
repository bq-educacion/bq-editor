import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import { extensions, ExtensionType } from "../../types.d";
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
      secondary
    >
      Code
    </ToolbarButton>
  );
};

const Code: ExtensionType = {
  extensionFunction: { func: CodeExtension },
  toolbarHandler: CodeButton,
  name: extensions.code,
};

export default Code;
