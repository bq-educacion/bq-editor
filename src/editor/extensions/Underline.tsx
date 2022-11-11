import {
  useActive,
  useChainedCommands,
  useCommands,
  useCurrentSelection,
} from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { UnderlineExtension } from "remirror/extensions";
import UnderlineIcon from "../assets/icons/Underline";
import { ToolbarButton } from "../utils";

const UnderlineButton: FC = () => {
  const active = useActive();
  const chain = useChainedCommands();
  const { toggleUnderline } = useCommands();
  const { to, from } = useCurrentSelection();

  return (
    <ToolbarButton
      className={classNames({ active: active.underline() })}
      disabled={!toggleUnderline.enabled()}
      onClick={() => {
        toggleUnderline();
        chain.focus({ to, from }).run();
      }}
    >
      <UnderlineIcon />
    </ToolbarButton>
  );
};

export { UnderlineButton, UnderlineExtension };
