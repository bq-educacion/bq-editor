import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { UnderlineExtension } from "remirror/extensions";
import UnderlineIcon from "../assets/icons/Underline";
import ToolbarButton from "../ToolbarButton";

const UnderlineButton: FC = () => {
  const active = useActive();
  const { toggleUnderline } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.underline() })}
      disabled={!toggleUnderline.enabled()}
      onClick={() => {
        toggleUnderline();
        focus();
      }}
    >
      <UnderlineIcon />
    </ToolbarButton>
  );
};

export { UnderlineButton, UnderlineExtension };
