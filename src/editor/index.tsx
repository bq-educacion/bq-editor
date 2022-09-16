import { EditorComponent, Remirror } from "@remirror/react";
import React, { FC } from "react";
import { htmlToProsemirrorNode, prosemirrorNodeToHtml, RemirrorEventListenerProps } from "remirror";
import { editorHandlers, toolbarHandlers, useManager } from "./lib";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";

export {
  htmlToProsemirrorNode as htmlToEditorNode,
  prosemirrorNodeToHtml as editorNodeToHtml
}

type CodeLanguage = "css" | "javascript" | "json" | "markdown" | "typescript";

type MaximumStrategy = "characters" | "words";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
type StringHandler = "html" | "markdown";

export const defaultExtensions = [
  [
    "bold",
    "italic",
    "code",
    "codeBlock"
  ],
  [
    "link"
  ],
  [
    "heading"
  ],
  [
    "bulletList",
    "orderedList"
  ],
];

export type IEditorProps = {
  codeLanguage: CodeLanguage;
  extensions?: string[][];
  initialContent?: string;
  maximumStrategy?: MaximumStrategy;
  maximum?: number;
  onChange?: (doc: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
}

const Editor: FC<IEditorProps> = ({
  codeLanguage = "javascript",
  extensions: activeExtensions = defaultExtensions,
  maximumStrategy = "characters",
  selection = "start",
  onChange,
  ...props
}) => {
  const input = {
    codeLanguage,
    extensions: activeExtensions,
    maximumStrategy,
    selection,
    ...props
  }

  const { manager, state } = useManager(input);

  return (
    <Remirror
      manager={manager}
      initialContent={state} 
      onChange={(props: RemirrorEventListenerProps<Remirror.Extensions>) => onChange(props.state.doc)}
    >
      <Toolbar handlers={toolbarHandlers(input)} />
      <Wrap>
        <EditorComponent />
        {editorHandlers(input)}
      </Wrap>
    </Remirror>
  );
};

export default Editor;
