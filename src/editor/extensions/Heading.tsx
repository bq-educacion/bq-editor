import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import { ToolbarSelect } from "../components";

export const HeadingName = "heading";

export type HeadingAttrs = {
  levels?: number[];
  translateFn?: (label: string) => string;
};

const HeadingButtons: FC<HeadingAttrs> = ({
  levels = [1, 2, 3, 4, 5, 6],
  translateFn,
}) => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarSelect
      disabled={
        !levels.find((level: number) =>
          commands.toggleHeading.enabled({ level: Number(level) })
        )
      }
      placeholder={translateFn ? translateFn("p") : "p"}
      onChange={(level) => {
        chain.focus({ to, from }).run();
        commands.toggleHeading({ level: Number(level) });
      }}
      options={levels.map((level) => ({
        active: active.heading({ level: Number(level) }),
        label: translateFn ? translateFn(`h${level}`) : `h${level}`,
        value: `${level}`,
      }))}
    />
  );
};

export { HeadingButtons, HeadingExtension };
