import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import { extensions, ExtensionType } from "../../types.d";
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

const OrderedList: ExtensionType = {
  extensionFunction: OrderedListExtension,
  toolbarHandler: OrderedListButton,
  name: extensions.orderedList,
};

export default OrderedList;
