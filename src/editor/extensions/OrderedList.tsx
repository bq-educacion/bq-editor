import { useActive, useCommands } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import ListNumberIcon from "../assets/icons/ListNumber";
import { ToolbarButton } from "../utils";

const OrderedListButton: FC = () => {
  const { liftListItemOutOfList, toggleOrderedList } = useCommands();
  useActive();

  return (
    <ToolbarButton
      onClick={() =>
        toggleOrderedList.enabled()
          ? toggleOrderedList()
          : liftListItemOutOfList()
      }
      disabled={
        !toggleOrderedList.enabled() && !liftListItemOutOfList.enabled()
      }
    >
      <ListNumberIcon />
    </ToolbarButton>
  );
};

export { OrderedListButton, OrderedListExtension };
