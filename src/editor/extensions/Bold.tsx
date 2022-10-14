import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { BoldExtension } from "remirror/extensions";
import ImgBold from "../assets/icons/Bold";
import ToolbarButton from "../ToolbarButton";

const BoldButton: FC = () => {
  const active = useActive();
  const { toggleBold } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.bold() })}
      disabled={!toggleBold.enabled()}
      onClick={() => {
        toggleBold();
        focus();
      }}
    >
      <ImgBold />
    </ToolbarButton>
  );
};

export { BoldButton, BoldExtension };
