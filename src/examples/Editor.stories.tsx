import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import { fn } from "storybook/test";
import Editor, { editorNodeToHtml, IEditorProps } from "../Editor";
import { colors } from "../theme";
import basic from "./content/basic.json";
import code from "./content/code.json";
import html from "./content/html.js";
import markdown from "./content/markdown.js";

export default {
  title: "Editor",
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

export const Default = Template.bind({});

Default.args = {
  placeholder: "Start typing...",
  initialContent: JSON.stringify(basic),
  onChange: fn(),
};

export const Html = Template.bind({});

Html.args = {
  stringHandler: "html",
  placeholder: "Start htmling...",
  initialContent: html,
  onChange: fn(),
};

export const Markdown = Template.bind({});

Markdown.args = {
  dualEditor: false,
  stringHandler: "markdown",
  placeholder: "Start markdowning...",
  initialContent: markdown,
  onChange: fn(),
};

export const Code = Template.bind({});

Code.args = {
  codeEditor: true,
  initialContent: JSON.stringify(code),
  onChange: fn(),
};
