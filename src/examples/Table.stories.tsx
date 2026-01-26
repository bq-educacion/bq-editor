import React, { useState } from "react";
import { ProsemirrorNode } from "remirror";
import { fn } from "storybook/test";
import Editor, { editorNodeToHtml, IEditorProps } from "../Editor";
import { colors } from "../theme";

export default {
  title: "Editor/Table",
  component: Editor,
};

const Template = (args: IEditorProps) => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <>
      <Editor onChange={setDoc} {...args} onFullScreen={undefined} />
      <p style={{ color: colors.grey1 }}>
        {doc && JSON.stringify(editorNodeToHtml(doc))}
      </p>
    </>
  );
};

export const TableOnly = Template.bind({}) as typeof Template & {
  args: IEditorProps;
};

TableOnly.args = {
  placeholder: "Click 'Tbl' to insert a table...",
  extensions: ["table"],
  editable: true,
  onChange: fn(),
};
