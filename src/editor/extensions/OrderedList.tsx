import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import ToolbarButton from "../ToolbarButton";

const OrderedListButton: FC = () => {
  const { toggleOrderedList } = useCommands();

  return (
    <ToolbarButton
      onClick={() => toggleOrderedList()}
      disabled={!toggleOrderedList.enabled()}
    >
      toggleOrderedList
    </ToolbarButton>
  );
};

export { OrderedListButton, OrderedListExtension };
