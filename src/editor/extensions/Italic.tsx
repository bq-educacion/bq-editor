import {
  useActive,
  useChainedCommands,
  useCommands,
  useCurrentSelection,
} from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { ItalicExtension } from "remirror/extensions";
import ItalicIcon from "../assets/icons/Italic";
import { ToolbarButton } from "../utils";

const ItalicButton: FC = () => {
  const active = useActive();
  const chain = useChainedCommands();
  const { toggleItalic } = useCommands();
  const { to, from } = useCurrentSelection();

  return (
    <ToolbarButton
      className={classNames({ active: active.italic() })}
      disabled={!toggleItalic.enabled()}
      onClick={() => {
        toggleItalic();
        chain.focus({ to, from }).run();
      }}
    >
      <ItalicIcon />
    </ToolbarButton>
  );
};

export { ItalicButton, ItalicExtension };
