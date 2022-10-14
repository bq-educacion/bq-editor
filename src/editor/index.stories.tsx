import React, { useState } from "react";
import Editor, { defaultExtensions, editorNodeToHtml, IEditorProps } from ".";
import { colors } from "../theme";

export default {
  title: "Editor",
  component: Editor,
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

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

export const Extensions = Template.bind({});

Extensions.args = {
  codeLanguage: "typescript",
  color: colors.orange1,
  extensions: defaultExtensions,
  placeholder: "Start typing...",
};

export const Html = Template.bind({});

Html.args = {
  initialContent: "<p>I love <b>HTML</b> !</p>",
  stringHandler: "html",
  placeholder: "Start htmling...",
};

export const Markdown = Template.bind({});

Markdown.args = {
  dualEditor: false,
  initialContent: "**Markdown** content is the _best_ !",
  stringHandler: "markdown",
  placeholder: "Start markdowning...",
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
