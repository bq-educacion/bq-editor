import { FilePasteRule, PasteRule } from "@remirror/pm/paste-rules";
import { useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC, useState } from "react";
import { ImageExtension } from "remirror/extensions";
import ImageIcon from "../icons/Image";
import { ToolbarButton, ToolbarFloating } from "../components";
import { Node, Slice, Fragment } from "@remirror/pm/model";
import { CreateExtensionPlugin } from "remirror";

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
  preventDrop?: boolean;
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
    <ToolbarFloating
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      target={
        <ToolbarButton
          className={cx({ active: isOpen || active.image() })}
          onClick={() => setIsOpen(true)}
        >
          <ImageIcon />
        </ToolbarButton>
      }
    >
      {imageHandler?.((value, attrs) => {
        onSubmit(value, attrs);
        setIsOpen(false);
      })}
    </ToolbarFloating>
  );
};

class ImagePreventDropExtension extends ImageExtension {
  createPasteRules(): PasteRule[] {
    // This is safe because ImageExtension.createPasteRules only returns a single PasteRule
    const [parentPasteRule] = super.createPasteRules();

    return [
      {
        type: "file",
        regexp: /image/i,
        fileHandler: (fileProps) => {
          if (fileProps.type === "drop") {
            return false; // block drops
          }
          if (fileProps.type === "paste") {
            return false; // block pastes
          }
          return (parentPasteRule as FilePasteRule).fileHandler(fileProps);
        },
      },
    ];
  }

  createPlugin(): CreateExtensionPlugin {
    return {
      props: {
        transformPasted(slice: Slice) {
          const stripImages = (frag: Fragment): Fragment => {
            const children: Node[] = [];
            frag.forEach((node) => {
              if (node.type.name !== "image") {
                children.push(node.copy(stripImages(node.content)));
              }
            });
            return Fragment.fromArray(children);
          };
          return new Slice(
            stripImages(slice.content as Fragment),
            slice.openStart,
            slice.openEnd
          ) as Slice;
        },
      },
    };
  }
}

export { ImageButton, ImageExtension, ImagePreventDropExtension };
