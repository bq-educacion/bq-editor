import React, { useState } from 'react';
import Editor, { editorNodeToHtml, IEditorProps } from '.';
import { extensions } from '../types.d';

export default {
  title: "Editor",
  component: Editor
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

  return (
    <>
      <Editor onChange={setDoc} {...args} />
      <p>{doc && JSON.stringify(args.stringHandler === "html" ? editorNodeToHtml(doc) : doc)}</p>
    </>
  );
};

export const Extensions = Template.bind({});

Extensions.args = {
  extensions: [
    [
      extensions.bold,
      extensions.italic,
      extensions.code,
      extensions.link
    ],
    [
      extensions.heading
    ],
    [
      extensions.bulletList,
      extensions.orderedList
    ],
  ],
  placeholder: "Start typing..."
};

export const Html = Template.bind({});

Html.args = {
  initialContent: "<p>I love <b>HTML</b></p>",
  stringHandler: "html",
  placeholder: "Start htmling..."
};

// export const Markdown = Template.bind({});

// Markdown.args = {
//   initialContent: "**Markdown** content is the _best_",
//   stringHandler: "markdown",
//   placeholder: "Start markdowning..."
// };

export const Counter = Template.bind({});

Counter.args = {
  maximumStrategy: "characters",
  maximum: 10
};
