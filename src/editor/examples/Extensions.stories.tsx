import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, IEditorProps } from "..";
import { colors } from "../../theme";
import image from "./content/image.js";

export default {
  title: "editor/Extensions",
  component: Editor,
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <>
      <Editor onChange={setDoc} {...args} />
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
        translateFn: (label: string) =>
          label === "p" ? "Paragraph" : `Heading ${label.slice(1)}`,
      },
    },
    "bold",
    "italic",
    "underline",
  ],
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
};

export const Counter = Template.bind({});

Counter.args = {
  extensions: [
    {
      name: "counter",
      attrs: {
        maximumStrategy: "characters",
        maximum: 10,
      },
    },
  ],
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
  ],
};

export const Lists = Template.bind({});

Lists.args = {
  extensions: ["bullet-list", "ordered-list"],
};

export const Link = Template.bind({});

Link.args = {
  extensions: ["link"],
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
};

export const Image = Template.bind({});

Image.args = {
  extensions: [
    {
      name: "image",
      attrs: {
        accept: [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"],
        onUpload: () => {
          return new Promise((resolve) => resolve(image));
        },
      },
    },
  ],
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
// };

export const Align = Template.bind({});

Align.args = {
  extensions: ["align"],
};

export const Indent = Template.bind({});

Indent.args = {
  extensions: ["ordered-list", "indent"],
};
