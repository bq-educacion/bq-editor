import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import CodeIcon from "../assets/icons/Code";
import { ToolbarButton } from "../components";

const CodeButton: FC = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.code() })}
      disabled={!commands.toggleCode.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleCode();
      }}
    >
      <CodeIcon />
    </ToolbarButton>
  );
};

export { CodeButton, CodeExtension };
