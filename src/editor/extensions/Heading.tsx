import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import ToolbarSelect from "../ToolbarSelect";

const HeadingButtons: FC = () => {
  const active = useActive(true);
  const { toggleHeading } = useCommands();

  return (
    <ToolbarSelect
      className={classNames({
        active:
          active.heading({ level: 1 }) ||
          active.heading({ level: 2 }) ||
          active.heading({ level: 3 }) ||
          active.heading({ level: 4 }) ||
          active.heading({ level: 5 }) ||
          active.heading({ level: 6 }),
      })}
      placeholder="Normal text"
      onChange={(level) => {
        toggleHeading({ level: parseInt(level) });
        focus();
      }}
      options={[1, 2, 3, 4, 5, 6].map((level) => ({
        active: active.heading({ level }),
        disabled: !toggleHeading.enabled({ level }),
        label: `H${level}`,
        value: `${level}`,
      }))}
    />
  );
};

export { HeadingButtons, HeadingExtension };
