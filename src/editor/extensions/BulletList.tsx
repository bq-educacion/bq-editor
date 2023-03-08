import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import ListBulletIcon from "../assets/icons/ListBullet";
import { ToolbarButton } from "../components";

export const BulletListName = "bullet-list";

export type BulletListAttrs = Record<string, never>;

const BulletListButton: FC<BulletListAttrs> = () => {
  const { commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      disabled={
        !commands.toggleBulletList.enabled() &&
        !commands.liftListItemOutOfList.enabled()
      }
      onClick={() =>
        commands.toggleBulletList.enabled()
          ? commands.toggleBulletList()
          : commands.liftListItemOutOfList()
      }
    >
      <ListBulletIcon />
    </ToolbarButton>
  );
};

export { BulletListButton, BulletListExtension };
