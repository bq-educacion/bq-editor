import {
  useActive,
  useChainedCommands,
  useCommands,
  useCurrentSelection,
} from "@remirror/react";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import { ToolbarSelect } from "../utils";

interface IHeadingProps {
  levels?: number[];
}

const HeadingButtons: FC<IHeadingProps> = ({ levels = [1, 2, 3, 4, 5, 6] }) => {
  const chain = useChainedCommands();
  const { toggleHeading } = useCommands();
  const { to, from } = useCurrentSelection();
  useActive();

  return (
    <ToolbarSelect
      disabled={!levels.find((level) => toggleHeading.enabled({ level }))}
      placeholder="Normal text"
      onChange={(level) => {
        toggleHeading({ level: parseInt(level) });
        chain.focus({ to, from }).run();
      }}
      options={levels.map((level) => ({
        active: toggleHeading.enabled() && !toggleHeading.enabled({ level }),
        label: `H${level}`,
        value: `${level}`,
      }))}
    />
  );
};

export { HeadingButtons, HeadingExtension };
