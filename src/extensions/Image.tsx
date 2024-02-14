import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { ImageExtension } from "remirror/extensions";
import ImageIcon from "../icons/Image";
import { Floating, ToolbarButton } from "../components";

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
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (src?: string, attrs?: ImageValueAttrs) => {
    if ((src || "") === "") return;
    commands.insertImage({
      resizable,
      src,
      ...attrs,
    });
  };

  return (
    <Floating
      isOpen={isOpen}
      target={
        <ToolbarButton
          className={classNames({ active: isOpen || active.image() })}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <ImageIcon />
        </ToolbarButton>
      }
    >
      {imageHandler?.((value, attrs) => {
        onSubmit(value, attrs);
        setIsOpen(false);
      })}
    </Floating>
  );
};

export { ImageButton, ImageExtension };
