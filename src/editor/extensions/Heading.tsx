import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import { ToolbarSelect } from "../components";

export const HeadingName = "heading";

export type HeadingAttrs = {
  levels?: number[];
};

const HeadingButtons: FC<HeadingAttrs> = ({ levels = [1, 2, 3, 4, 5, 6] }) => {
  const { to, from } = useCurrentSelection();
  const { chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarSelect
      disabled={
        !levels.find((level: number) =>
          commands.toggleHeading.enabled({ level })
        )
      }
      placeholder="Normal text"
      onChange={(level) => {
        chain.focus({ to, from }).run();
        commands.toggleHeading({ level: Number(level) });
      }}
      options={levels.map((level) => ({
        active:
          commands.toggleHeading.enabled() &&
          !commands.toggleHeading.enabled({ level }),
        label: `H${level}`,
        value: `${level}`,
      }))}
    />
  );
};

export { HeadingButtons, HeadingExtension };
