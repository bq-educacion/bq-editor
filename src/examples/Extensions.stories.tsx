import React, { useEffect, useState } from "react";
import { ProsemirrorNode } from "remirror";
import styled from "@emotion/styled";
import { fn } from "@storybook/test";
import Editor, { editorNodeToHtml, IEditorProps } from "../Editor";
import { colors } from "../theme";
import { ImageValueAttrs } from "../extensions";

export default {
  title: "Extensions",
  component: Editor,
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <>
      <Editor onChange={setDoc} {...args} onFullScreen={undefined} />
      <p style={{ color: colors.grey1 }}>
        {doc &&
          JSON.stringify(
            args.stringHandler === "html" ? editorNodeToHtml(doc) : doc
          )}
      </p>
    </>
  );
};

export const RichText = Template.bind({});

RichText.args = {
  extensions: [
    {
      name: "heading",
      attrs: {
        levels: [1, 2, 3],
        translateFn: (key: string) =>
          key === "p" ? "P" : `Heading ${key.slice(1)}`,
      },
    },
    "bold",
    "italic",
    "underline",
  ],
  onChange: fn(),
};

export const Code = Template.bind({});

Code.args = {
  extensions: [
    "code",
    {
      name: "code-block",
      attrs: {
        language: "css",
      },
    },
  ],
  onChange: fn(),
};

export const characterCount = Template.bind({});

characterCount.args = {
  style: {
    maxHeight: 183,
  },
  counter: true,
  onChange: fn(),
};

export const characterMaxLength = Template.bind({});

characterMaxLength.args = {
  style: {
    maxHeight: 183,
  },
  maxLength: { value: 10, truncate: true },
  onChange: fn(),
};

export const TextColor = Template.bind({});

TextColor.args = {
  extensions: [
    {
      name: "text-color",
      attrs: {
        color: colors.orange1,
      },
    },
    {
      name: "text-highlight",
      attrs: {
        color: colors.orange1,
      },
    },
  ],
  onChange: fn(),
};

export const TextColorHandler = Template.bind({});

TextColorHandler.args = {
  colorHandler: (onChange: (value?: string) => void, value?: string) => (
    <Modal>
      <button
        onClick={() => onChange(colors.red1)}
        disabled={value === colors.red1}
      >
        Red
      </button>
      <button
        onClick={() => onChange(colors.turquoise1)}
        disabled={value === colors.turquoise1}
      >
        Turquoise
      </button>
      <button
        onClick={() => onChange(colors.yellow1)}
        disabled={value === colors.yellow1}
      >
        Yellow
      </button>
      <button onClick={() => onChange()} disabled={value === undefined}>
        No color
      </button>
    </Modal>
  ),
  extensions: [
    "bold",
    "italic",
    "underline",
    {
      name: "text-color",
    },
    {
      name: "text-highlight",
    },
  ],
  onChange: fn(),
};

export const SubSup = Template.bind({});

SubSup.args = {
  extensions: ["sub", "sup"],
  onChange: fn(),
};

export const Lists = Template.bind({});

Lists.args = {
  extensions: ["bullet-list", "ordered-list"],
  onChange: fn(),
};

export const Link = Template.bind({});

Link.args = {
  extensions: [
    "bold",
    "italic",
    "underline",
    {
      name: "link",
      attrs: {
        linkHandler: (onChange: (value?: string) => void, value?: string) => {
          const [href, setHref] = useState(value);

          useEffect(() => {
            setHref(value);
          }, [value]);

          return (
            <Modal>
              <label>Href:</label>
              <input onChange={(e) => setHref(e.target.value)} value={href} />
              <button onClick={() => (onChange(href), setHref(""))}>
                Submit
              </button>
              <button onClick={() => (onChange(), setHref(""))}>Delete</button>
            </Modal>
          );
        },
      },
    },
  ],
  onChange: fn(),
};

export const AutoLink = Template.bind({});

AutoLink.args = {
  extensions: [
    {
      name: "link",
      attrs: {
        autoLink: true,
      },
    },
  ],
  placeholder: `Type "www.educacion.bq.com" to insert a link`,
  stringHandler: "html",
  onChange: fn(),
};

export const Image = Template.bind({});

Image.args = {
  extensions: [
    "bold",
    "italic",
    "underline",
    {
      name: "image",
      attrs: {
        imageHandler: (
          onChange: (value?: string, attrs?: ImageValueAttrs) => void
        ) => {
          const [src, setSrc] = useState("");
          const [height, setHeight] = useState("");

          return (
            <Modal>
              <label>Src:</label>
              <input onChange={(e) => setSrc(e.target.value)} value={src} />
              <label>Height:</label>
              <input
                onChange={(e) => setHeight(e.target.value)}
                value={height}
              />
              <button
                onClick={() => (
                  onChange(src, { height }), setSrc(""), setHeight("")
                )}
              >
                Submit
              </button>
              <button onClick={() => (onChange(), setSrc(""), setHeight(""))}>
                Cancel
              </button>
            </Modal>
          );
        },
      },
    },
  ],
  onChange: fn(),
};

export const ImagePreventDrop = Template.bind({});

ImagePreventDrop.args = {
  extensions: [
    "bold",
    "italic",
    "underline",
    {
      name: "image",
      attrs: {
        preventDrop: true,
        imageHandler: Image.args.extensions[3].attrs.imageHandler,
      },
    },
  ],
  onChange: fn(),
};

// export const ImageResizable = Template.bind({});

// ImageResizable.args = {
//   extensions: [
//     {
//       name: "image",
//       attrs: {
//         accept: [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"],
//         resizable: true,
//         onUpload: () => {
//           return new Promise((resolve) => resolve(image));
//         },
//       },
//     },
//   ],
//   onChange: fn(),
// };

export const Align = Template.bind({});

Align.args = {
  extensions: ["align"],
  onChange: fn(),
};

export const Indent = Template.bind({});

Indent.args = {
  extensions: ["indent"],
  onChange: fn(),
};

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
  padding: 10px;
`;
