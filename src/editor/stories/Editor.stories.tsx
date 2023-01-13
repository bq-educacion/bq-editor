import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, IEditorProps } from "..";
import { colors } from "../../theme";
import basic from "./content/basic.json";
import code from "./content/code.json";
import html from "./content/html.js";
import markdown from "./content/markdown.js";

export default {
  title: "editor/Editor",
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

export const Default = Template.bind({});

Default.args = {
  initialContent: JSON.stringify(basic),
  placeholder: "Start typing...",
};

export const Html = Template.bind({});

Html.args = {
  initialContent: html,
  stringHandler: "html",
  placeholder: "Start htmling...",
};

export const Markdown = Template.bind({});

Markdown.args = {
  dualEditor: false,
  initialContent: markdown,
  stringHandler: "markdown",
  placeholder: "Start markdowning...",
};

export const Code = Template.bind({});

Code.args = {
  codeLanguage: "typescript",
  initialContent: JSON.stringify(code),
  stringHandler: "code",
};
