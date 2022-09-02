import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { ItalicExtension } from "remirror/extensions";
import { extensions, ExtensionType } from "../../types.d";
import ToolbarButton from "../ToolbarButton";

const ItalicButton: FC = () => {
  const active = useActive();
  const { toggleItalic } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.italic() })}
      disabled={!toggleItalic.enabled()}
      onClick={() => {
        toggleItalic();
        focus();
      }}
      secondary
    >
      I
    </ToolbarButton>
  );
};

const Italic: ExtensionType = {
  extensionFunction: ItalicExtension,
  toolbarHandler: ItalicButton,
  name: extensions.italic,
};

export default Italic;
