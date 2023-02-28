import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import ListBulletIcon from "../assets/icons/ListBullet";
import { ToolbarButton } from "../components";

const BulletListButton: FC = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      onClick={() =>
        commands.toggleBulletList.enabled()
          ? commands.toggleBulletList()
          : commands.liftListItemOutOfList()
      }
      disabled={
        !commands.toggleBulletList.enabled() &&
        !commands.liftListItemOutOfList.enabled()
      }
    >
      <ListBulletIcon />
    </ToolbarButton>
  );
};

export { BulletListButton, BulletListExtension };
