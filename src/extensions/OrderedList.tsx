import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { OrderedListExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const OrderedListButton: FC = () => {
  const { toggleOrderedList } = useCommands();

  return (
    <Button
      onClick={() => toggleOrderedList()}
      disabled={!toggleOrderedList.enabled()}
    >
      toggleOrderedList
    </Button>
  );
};

const OrderedList: ExtensionType = {
  extensionFunction: { func: OrderedListExtension },
  toolbarHandler: OrderedListButton,
  name: extensions.orderedList,
};

export default OrderedList;
