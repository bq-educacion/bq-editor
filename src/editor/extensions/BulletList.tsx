import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import { extensions, ExtensionType } from "../../types.d";
import ToolbarButton from "../ToolbarButton";

const BulletListButton: FC = () => {
  const { toggleBulletList } = useCommands();

  return (
    <ToolbarButton
      onClick={() => toggleBulletList()}
      disabled={!toggleBulletList.enabled()}
      secondary
    >
      toggleBulletList
    </ToolbarButton>
  );
};

const BulletList: ExtensionType = {
  extensionFunction: { func: BulletListExtension },
  toolbarHandler: BulletListButton,
  name: extensions.bulletList,
};

export default BulletList;
