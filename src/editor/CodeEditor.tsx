import { Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import { AnyExtension, RemirrorEventListenerProps } from "remirror";
import { DocExtension } from "remirror/extensions";
import { CodeBlockExtension } from "./extensions";
import { checkEmptyEditor } from "./lib";
import { IEditorProps } from ".";

const CodeEditor: FC<IEditorProps & { children: React.ReactNode }> = ({
  children,
  editable,
  initialContent: content,
  onChange,
  selection,
}) => {
  const { manager, state: initialContent } = useRemirror({
    extensions: () => [
      new DocExtension({ content: "codeBlock" }),
      new CodeBlockExtension({
        defaultWrap: true,
      }),
    ],
    content: content ? Object.create(JSON.parse(content)) : content,
    selection,
  });

  return (
    <Remirror
      editable={editable}
      manager={manager}
      initialContent={initialContent}
      onChange={({ state }: RemirrorEventListenerProps<AnyExtension>) =>
        onChange?.(checkEmptyEditor(state) ? undefined : state.doc)
      }
    >
      {children}
    </Remirror>
  );
};

export default CodeEditor;
