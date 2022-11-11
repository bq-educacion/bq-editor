import { Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import langTypescript from "refractor/lang/typescript.js";
import { AnyExtension, RemirrorEventListenerProps } from "remirror";
import { DocExtension } from "remirror/extensions";
import { CodeBlockExtension } from "../extensions";
import { IEditorProps } from "..";

const CodeEditor: FC<IEditorProps> = ({
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
        defaultLanguage: "typescript",
        supportedLanguages: [langTypescript],
        syntaxTheme: "base16_ateliersulphurpool_light",
        defaultWrap: true,
      }),
    ],
    content: Object.create(JSON.parse(content)),
    selection,
  });

  return (
    <Remirror
      editable={editable}
      manager={manager}
      initialContent={initialContent}
      onChange={({ state }: RemirrorEventListenerProps<AnyExtension>) =>
        onChange?.(state.doc)
      }
    >
      {children}
    </Remirror>
  );
};

export default CodeEditor;
