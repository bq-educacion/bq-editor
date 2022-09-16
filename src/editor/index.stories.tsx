import React, { useState } from 'react';
import Editor, { IEditorProps } from '.';
import { extensions } from '../types.d';

export default {
  title: "Editor",
  component: Editor
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<any>();

  return (
    <>
      <Editor onChange={setDoc} {...args} />
      <p>{JSON.stringify(doc)}</p>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  counter: { maximumStrategy: "characters", maximum: 10 },
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
  selection: "start",
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
