import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { SupExtension } from "remirror/extensions";
import SupIcon from "../icons/Sup";
import { ToolbarButton } from "../components";

export const SupName = "sup";

export type SupAttrs = Record<string, never>;

const SupButton: FC<SupAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.sup() })}
      disabled={!commands.toggleSuperscript.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleSuperscript();
      }}
    >
      <SupIcon />
    </ToolbarButton>
  );
};

export { SupButton, SupExtension };
