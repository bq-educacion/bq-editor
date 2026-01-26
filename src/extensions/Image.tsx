import { FilePasteRule, PasteRule } from "@remirror/pm/paste-rules";
import { useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC, useState, JSX } from "react";
import { ImageExtension } from "remirror/extensions";
import ImageIcon from "../icons/Image";
import { ToolbarButton, ToolbarFloating } from "../components";
import { Node, Slice, Fragment } from "@remirror/pm/model";
import type {
  ApplySchemaAttributes,
  DOMOutputSpec,
  NodeExtensionSpec,
  NodeSpecOverride,
} from "@remirror/core";
import { CreateExtensionPlugin } from "remirror";

type GetImageUrlOptions = {
  getImageUrl?: (id: string) => Promise<string>;
};

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
  imageId?: string;
};

export type ImageAttrs = {
  imageHandler?: (
    onChange: (value?: string, attrs?: ImageValueAttrs) => void,
    value?: string
  ) => JSX.Element;
  resizable?: boolean; // TODO: Not working
  preventDrop?: boolean;
  getImageUrl?: (id: string) => Promise<string>;
};

const ImageButton: FC<ImageAttrs> = ({ imageHandler, resizable }) => {
  const { active, commands } = useRemirrorContext({ autoUpdate: true });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (src: string, attrs?: ImageValueAttrs) => {
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
        onSubmit(value || "", attrs);
        setIsOpen(false);
      })}
    </ToolbarFloating>
  );
};

class ImagePreventDropExtension extends ImageExtension {
  private urlCache = new Map<string, string>();

  get name() {
    return "image" as const;
  }

  createNodeViews() {
    return {
      image: (node: Node) => {
        const dom = document.createElement("img");

        Object.entries(node.attrs).forEach(([key, value]) => {
          if (value && key !== "imageId") {
            if (key === "src") {
              dom.src = value as string;
            } else {
              dom.setAttribute(key, String(value));
            }
          }
        });

        if (node.attrs.imageId) {
          dom.setAttribute("data-image-id", node.attrs.imageId);

          const cachedUrl = this.urlCache.get(node.attrs.imageId);
          const hasSrc = node.attrs.src && node.attrs.src.trim() !== "";

          if (cachedUrl) {
            dom.src = cachedUrl;
          } else if (!hasSrc) {
            const getImageUrl = (this.options as unknown as GetImageUrlOptions)
              .getImageUrl;
            if (getImageUrl && typeof getImageUrl === "function") {
              getImageUrl(node.attrs.imageId)
                .then((url: string) => {
                  if (url) {
                    this.urlCache.set(node.attrs.imageId, url);
                    dom.src = url;
                  }
                })
                .catch((err: unknown) => {
                  console.error("Failed to load image URL:", err);
                });
            }
          }

          dom.onerror = () => {
            const getImageUrl = (this.options as unknown as GetImageUrlOptions)
              .getImageUrl;
            if (getImageUrl && typeof getImageUrl === "function") {
              getImageUrl(node.attrs.imageId)
                .then((url: string) => {
                  if (url) {
                    this.urlCache.set(node.attrs.imageId, url);
                    dom.src = url;
                  }
                })
                .catch((err: unknown) => {
                  console.error("Failed to load image URL:", err);
                });
            }
          };
        }

        return { dom };
      },
    };
  }

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

  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    const spec = super.createNodeSpec(extra, override);

    return {
      ...spec,
      attrs: {
        ...spec.attrs,
        imageId: { default: null },
      },
      toDOM: (node) => {
        const domSpec = spec.toDOM!(node);
        const [tag, attrs, ...rest] = domSpec as [
          string,
          unknown,
          ...unknown[]
        ];

        const baseAttrs =
          typeof attrs === "object" && attrs !== null
            ? (attrs as Record<string, unknown>)
            : {};
        const newAttrs: Record<string, unknown> = {
          ...baseAttrs,
          ...(node.attrs.imageId && { "data-image-id": node.attrs.imageId }),
        };

        return [tag, newAttrs, ...rest] as unknown as DOMOutputSpec;
      },
      parseDOM: [
        {
          tag: "img[data-image-id]",
          getAttrs: (dom: HTMLElement) => {
            const baseAttrs = spec.parseDOM?.[0]?.getAttrs?.(dom) || {};
            return {
              ...(typeof baseAttrs === "object" ? baseAttrs : {}),
              imageId: (dom as HTMLElement).dataset.imageId,
            };
          },
        },
        ...(spec.parseDOM ?? []),
      ],
    };
  }
}

export { ImageButton, ImageExtension, ImagePreventDropExtension };
