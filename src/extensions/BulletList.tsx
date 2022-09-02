import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import { Button } from "../basics";
import { extensions, ExtensionType } from "../types.d";

const BulletListButton: FC = () => {
  const { toggleBulletList } = useCommands();

  return (
    <Button
      onClick={() => toggleBulletList()}
      disabled={!toggleBulletList.enabled()}
    >
      toggleBulletList
    </Button>
  );
};

const BulletList: ExtensionType = {
  extensionFunction: { func: BulletListExtension },
  toolbarHandler: BulletListButton,
  name: extensions.bulletList,
};

export default BulletList;
