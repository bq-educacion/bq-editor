import { useActive, useCommands } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import ListBulletIcon from "../assets/icons/ListBullet";
import { ToolbarButton } from "../components";

const BulletListButton: FC = () => {
  const { liftListItemOutOfList, toggleBulletList } = useCommands();
  useActive();

  return (
    <ToolbarButton
      onClick={() =>
        toggleBulletList.enabled()
          ? toggleBulletList()
          : liftListItemOutOfList()
      }
      disabled={!toggleBulletList.enabled() && !liftListItemOutOfList.enabled()}
    >
      <ListBulletIcon />
    </ToolbarButton>
  );
};

export { BulletListButton, BulletListExtension };
