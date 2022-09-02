import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { HeadingExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const HeadingButtons: FC = () => {
  const active = useActive(true);
  const { toggleHeading } = useCommands();

  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <Button
          className={classNames({ active: active.heading({ level }) })}
          disabled={!toggleHeading.enabled({ level })}
          onClick={() => {
            toggleHeading({ level });
            focus();
          }}
          key={level}
        >
          H{level}
        </Button>
      ))}
    </>
  );
};

const Heading: ExtensionType = {
  extensionFunction: { func: HeadingExtension },
  toolbarHandler: HeadingButtons,
  name: extensions.heading,
};

export default Heading;
