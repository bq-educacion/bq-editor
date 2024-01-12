import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { ImageExtension } from "remirror/extensions";
import ImageIcon from "../icons/Image";
import { Dropdown, ToolbarButton } from "../components";

export const ImageName = "image";

export type ImageValueAttrs = {
  align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  alt?: string;
  height?: string;
  rotate?: string;
  title?: string;
  width?: string;
};

export type ImageAttrs = {
  imageHandler?: (
    onChange: (value?: string, attrs?: ImageValueAttrs) => void,
    value?: string
  ) => JSX.Element;
  resizable?: boolean; // TODO: Not working
};

const ImageButton: FC<ImageAttrs> = ({ imageHandler, resizable }) => {
  const { active, commands } = useRemirrorContext({ autoUpdate: true });
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (src?: string, attrs?: ImageValueAttrs) => {
    if ((src || "") === "") return;
    commands.insertImage({
      resizable,
      src,
      ...attrs,
    });
  };

  return (
    <Dropdown
      className="bq-editor-dropdown"
      isOpen={showModal}
      offset="-10 -40"
      onClose={() => setShowModal(false)}
      target={
        <ToolbarButton
          className={classNames({ active: showModal || active.image() })}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <ImageIcon />
        </ToolbarButton>
      }
    >
      {imageHandler?.((value, attrs) => {
        onSubmit(value, attrs);
        setShowModal(false);
      })}
    </Dropdown>
  );
};

export { ImageButton, ImageExtension };
