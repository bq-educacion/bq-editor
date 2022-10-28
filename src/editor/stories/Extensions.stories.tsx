import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import Editor, { defaultExtensions, editorNodeToHtml, IEditorProps } from "..";
import { colors } from "../../theme";

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
  onUploadMedia: (file: File) => {
    console.log(file);
    return new Promise((resolve) =>
      resolve(
        "https://pixabay.com/get/g538d4371e2a7c016e36c1ae1ea4de6313df1b2fa1cd8d647e0469854072e3d7db1584ddc5f003f57a9ea6698cc201db3dd62144a7be99d31da649289ee808f61de65d01957f03d11b355c041d7fe760e_640.jpg"
      )
    );
  },
};
