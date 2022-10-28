import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import Editor, { defaultExtensions, editorNodeToHtml, IEditorProps } from "..";
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
      <p>
        {doc &&
          JSON.stringify(
            args.stringHandler === "html" ? editorNodeToHtml(doc) : doc
          )}
      </p>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  codeLanguage: "typescript",
  color: colors.orange1,
  extensions: defaultExtensions,
  headingLevels: [1, 2, 3, 4],
  placeholder: "Start typing...",
};

export const AutoLink = Template.bind({});

AutoLink.args = {
  autoLink: true,
  placeholder: `Type "www.educacion.bq.com" to insert a link`,
  stringHandler: "html",
};

export const Counter = Template.bind({});

Counter.args = {
  maximumStrategy: "characters",
  maximum: 10,
};

export const Media = Template.bind({});

Media.args = {
  acceptMedia: {
    image: [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"],
  },
  enableImageResizing: true,
  onUploadMedia: () => {
    return new Promise((resolve) => resolve(image));
  },
};
