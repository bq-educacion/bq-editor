import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { ItalicExtension } from "remirror/extensions";
import ImgItalic from "../assets/icons/Italic";
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
    >
      <ImgItalic />
    </ToolbarButton>
  );
};

export { ItalicButton, ItalicExtension };
