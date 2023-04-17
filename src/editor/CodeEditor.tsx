import { Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import langCss from "refractor/lang/css.js";
import langJavascript from "refractor/lang/javascript.js";
import langJson from "refractor/lang/json.js";
import langMarkdown from "refractor/lang/markdown.js";
import langTypescript from "refractor/lang/typescript.js";
import { AnyExtension, RemirrorEventListenerProps } from "remirror";
import { DocExtension } from "remirror/extensions";
import { CodeBlockExtension } from "./extensions";
import { checkEmptyEditor } from "./lib";
import { IEditorProps } from ".";

const CodeEditor: FC<IEditorProps & { children: React.ReactNode }> = ({
  children,
  codeLanguage,
  editable,
  initialContent: content,
  onChange,
  selection,
}) => {
  const { manager, state: initialContent } = useRemirror({
    extensions: () => [
      new DocExtension({ content: "codeBlock" }),
      new CodeBlockExtension({
        defaultLanguage: codeLanguage,
        supportedLanguages: [
          langCss,
          langJavascript,
          langJson,
          langMarkdown,
          langTypescript,
        ],
        syntaxTheme: "base16_ateliersulphurpool_light",
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
