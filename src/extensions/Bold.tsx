import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { BoldExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const BoldButton: FC = () => {
  const active = useActive();
  const { toggleBold } = useCommands();

  return (
    <Button
      className={classNames({ active: active.bold() })}
      disabled={!toggleBold.enabled()}
      onClick={() => {
        toggleBold();
        focus();
      }}
    >
      B
    </Button>
  );
};

const Bold: ExtensionType = {
  extensionFunction: { func: BoldExtension },
  toolbarHandler: BoldButton,
  name: extensions.bold,
};

export default Bold;
