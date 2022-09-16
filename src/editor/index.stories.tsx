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
      <p>{doc && JSON.stringify(doc.content)}</p>
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
  stringHandler: "html"
};

export const Markdown = Template.bind({});

Html.args = {
  // initialContent: "**Markdown** content is the _best_",
  stringHandler: "markdown"
};
