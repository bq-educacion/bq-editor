import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import ToolbarButton from "../ToolbarButton";

const HeadingButtons: FC = () => {
  const active = useActive(true);
  const { toggleHeading } = useCommands();

  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <ToolbarButton
          className={classNames({ active: active.heading({ level }) })}
          disabled={!toggleHeading.enabled({ level })}
          onClick={() => {
            toggleHeading({ level });
            focus();
          }}
          key={level}
        >
          H{level}
        </ToolbarButton>
      ))}
    </>
  );
};

export { HeadingButtons, HeadingExtension };
