import React, { FC } from "react";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { defaultExtensions, IEditorProps } from ".";
import { managerExtensions } from "./lib";

export type IVisorProps = IEditorProps;

const Visor: FC<IVisorProps> = (props) => {
  const {
    extensions = defaultExtensions,
    initialContent: content,
    stringHandler,
  } = props;

  const input = {
    extensions,
    ...props,
  };

  const { manager, state: initialContent } = useRemirror({
    extensions: managerExtensions(input),
    content:
      !stringHandler && content ? Object.create(JSON.parse(content)) : content,
    stringHandler,
  });

  return (
    <Remirror
      editable={false}
      manager={manager}
      initialContent={initialContent}
    >
      <EditorComponent />
    </Remirror>
  );
};

export default Visor;
