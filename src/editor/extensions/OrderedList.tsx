import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import ListNumberIcon from "../assets/icons/ListNumber";
import ToolbarButton from "../ToolbarButton";

const OrderedListButton: FC = () => {
  const { toggleOrderedList } = useCommands();

  return (
    <ToolbarButton
      onClick={() => toggleOrderedList()}
      disabled={!toggleOrderedList.enabled()}
    >
      <ListNumberIcon />
    </ToolbarButton>
  );
};

export { OrderedListButton, OrderedListExtension };
