import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { SubExtension } from "remirror/extensions";
import SubIcon from "../assets/icons/Sub";
import { ToolbarButton } from "../components";

export const SubName = "sub";

export type SubAttrs = Record<string, never>;

const SubButton: FC<SubAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.sub() })}
      disabled={!commands.toggleSubscript.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleSubscript();
      }}
    >
      <SubIcon />
    </ToolbarButton>
  );
};

export { SubButton, SubExtension };
