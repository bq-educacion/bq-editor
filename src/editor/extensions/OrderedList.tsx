import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import ListNumberIcon from "../assets/icons/ListNumber";
import { ToolbarButton } from "../components";

export const OrderedListName = "ordered-list";

export type OrderedListAttrs = Record<string, never>;

const OrderedListButton: FC<OrderedListAttrs> = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      disabled={
        !commands.toggleOrderedList.enabled() &&
        !commands.liftListItemOutOfList.enabled()
      }
      onClick={() =>
        commands.toggleOrderedList.enabled()
          ? commands.toggleOrderedList()
          : commands.liftListItemOutOfList()
      }
    >
      <ListNumberIcon />
    </ToolbarButton>
  );
};

export { OrderedListButton, OrderedListExtension };
