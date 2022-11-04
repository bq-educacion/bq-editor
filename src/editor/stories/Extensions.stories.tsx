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
  extensions: [["heading", "bold", "italic", "underline"]],
  headingLevels: [1, 2, 3, 4],
};

export const Code = Template.bind({});

Code.args = {
  codeLanguage: "typescript",
  extensions: [["code", "codeBlock"]],
};

export const Counter = Template.bind({});

Counter.args = {
  extensions: [],
  maximumStrategy: "characters",
  maximum: 10,
};

export const TextColor = Template.bind({});

TextColor.args = {
  color: colors.orange1,
  extensions: [["textColor"]],
};

export const Lists = Template.bind({});

Lists.args = {
  extensions: [["bulletList", "orderedList"]],
};

export const Link = Template.bind({});

Link.args = {
  extensions: [["link"]],
};

export const AutoLink = Template.bind({});

AutoLink.args = {
  autoLink: true,
  extensions: [["link"]],
  placeholder: `Type "www.educacion.bq.com" to insert a link`,
  stringHandler: "html",
};

export const Image = Template.bind({});

Image.args = {
  acceptMedia: {
    image: [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"],
  },
  enableImageResizing: true,
  extensions: [["image"]],
  onUploadMedia: () => {
    return new Promise((resolve) => resolve(image));
  },
};
