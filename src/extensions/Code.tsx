import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const CodeButton: FC = () => {
  const active = useActive();
  const { toggleCode } = useCommands();

  return (
    <Button
      className={classNames({ active: active.code() })}
      disabled={!toggleCode.enabled()}
      onClick={() => {
        toggleCode();
        focus();
      }}
    >
      Code
    </Button>
  );
};

const Code: ExtensionType = {
  extensionFunction: { func: CodeExtension },
  toolbarHandler: CodeButton,
  name: extensions.code,
};

export default Code;
