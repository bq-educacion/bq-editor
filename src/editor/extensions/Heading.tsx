import { useActive, useCommands } from "@remirror/react";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import ToolbarSelect from "../ToolbarSelect";

interface IHeadingProps {
  levels?: number[];
}

const HeadingButtons: FC<IHeadingProps> = ({ levels = [1, 2, 3, 4, 5, 6] }) => {
  const { toggleHeading } = useCommands();
  useActive();

  return (
    <ToolbarSelect
      disabled={!levels.find((level) => toggleHeading.enabled({ level }))}
      placeholder="Normal text"
      onChange={(level) => {
        toggleHeading({ level: parseInt(level) });
        focus();
      }}
      options={levels.map((level) => ({
        active: !toggleHeading.enabled({ level }),
        label: `H${level}`,
        value: `${level}`,
      }))}
    />
  );
};

export { HeadingButtons, HeadingExtension };
