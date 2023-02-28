import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import ListNumberIcon from "../assets/icons/ListNumber";
import { ToolbarButton } from "../components";

const OrderedListButton: FC = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      onClick={() =>
        commands.toggleOrderedList.enabled()
          ? commands.toggleOrderedList()
          : commands.liftListItemOutOfList()
      }
      disabled={
        !commands.toggleOrderedList.enabled() &&
        !commands.liftListItemOutOfList.enabled()
      }
    >
      <ListNumberIcon />
    </ToolbarButton>
  );
};

export { OrderedListButton, OrderedListExtension };
