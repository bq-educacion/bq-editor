import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import { ToolbarSelect } from "../components";

export const HeadingName = "heading";

export type HeadingAttrs = {
  levels?: number[];
  translateFn?: (key: string) => string;
};

const HeadingSelect: FC<HeadingAttrs> = ({
  levels = [1, 2, 3, 4, 5, 6],
  translateFn,
}) => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarSelect
      classNameDropdown="bq-editor-dropdown"
      disabled={
        !levels.find((level: number) =>
          commands.toggleHeading.enabled({ level: Number(level) })
        )
      }
      placeholder={translateFn?.("p") || "p"}
      onChange={(level) => {
        chain.focus({ to, from }).run();
        commands.toggleHeading(
          level === "p" ? undefined : { level: Number(level) }
        );
      }}
      options={[
        {
          active: !active.heading(),
          label: translateFn?.("p") || "p",
          value: "p",
        },
        ...levels.map((level) => ({
          active: active.heading({ level: Number(level) }),
          label: translateFn?.(`h${level}`) || `h${level}`,
          value: `${level}`,
        })),
      ]}
    />
  );
};

export { HeadingSelect, HeadingExtension };
