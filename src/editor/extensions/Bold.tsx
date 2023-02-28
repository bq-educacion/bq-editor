import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { BoldExtension } from "remirror/extensions";
import BoldIcon from "../assets/icons/Bold";
import { ToolbarButton } from "../components";

const BoldButton: FC = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.bold() })}
      disabled={!commands.toggleBold.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleBold();
      }}
    >
      <BoldIcon />
    </ToolbarButton>
  );
};

export { BoldButton, BoldExtension };
