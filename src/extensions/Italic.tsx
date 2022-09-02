import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { ItalicExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const ItalicButton: FC = () => {
  const active = useActive();
  const { toggleItalic } = useCommands();

  return (
    <Button
      className={classNames({ active: active.italic() })}
      disabled={!toggleItalic.enabled()}
      onClick={() => {
        toggleItalic();
        focus();
      }}
    >
      I
    </Button>
  );
};

const Italic: ExtensionType = {
  extensionFunction: { func: ItalicExtension },
  toolbarHandler: ItalicButton,
  name: extensions.italic,
};

export default Italic;
