import { useCommands } from "@remirror/react";
import React, { FC } from "react";
import { BulletListExtension } from "remirror/extensions";
import ImgListBullet from "../assets/icons/ListBullet";
import ToolbarButton from "../ToolbarButton";

const BulletListButton: FC = () => {
  const { toggleBulletList } = useCommands();

  return (
    <ToolbarButton
      onClick={() => toggleBulletList()}
      disabled={!toggleBulletList.enabled()}
    >
      <ImgListBullet />
    </ToolbarButton>
  );
};

export { BulletListButton, BulletListExtension };
