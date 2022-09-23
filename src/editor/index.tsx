import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import {
  htmlToProsemirrorNode,
  prosemirrorNodeToHtml,
  RemirrorEventListenerProps,
} from "remirror";
import { editorHandlers, managerExtensions, toolbarHandlers } from "./lib";
import MarkdownDualEditor from "./MarkdownDualEditor";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";
import "remirror/styles/extension-code-block.css";
import "remirror/styles/extension-placeholder.css";

export {
  htmlToProsemirrorNode as htmlToEditorNode,
  prosemirrorNodeToHtml as editorNodeToHtml,
};

type CodeLanguage = "css" | "javascript" | "json" | "markdown" | "typescript";

type MaximumStrategy = "characters" | "words";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
type StringHandler = "html" | "markdown";

export const defaultExtensions = [
  ["bold", "italic", "code", "codeBlock", "textColor"],
  ["link"],
  ["heading"],
  ["bulletList", "orderedList"],
];

export type IEditorProps = {
  codeLanguage: CodeLanguage;
  color: string;
  dualEditor?: boolean;
  extensions?: string[][];
  initialContent?: string;
  maximumStrategy?: MaximumStrategy;
  maximum?: number;
  onChange?: (doc: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
};

const Editor: FC<IEditorProps> = (props) => {
  const {
    dualEditor,
    initialContent: content,
    onChange,
    selection = "start",
    stringHandler,
  } = props;

  if (stringHandler === "markdown" && dualEditor) {
    return (
      <MarkdownDualEditor {...props}>
        <Toolbar handlers={toolbarHandlers(props)} />
        <Wrap>
          <EditorComponent />
          {editorHandlers(props)}
        </Wrap>
      </MarkdownDualEditor>
    );
  }

  const { manager, state: initialContent } = useRemirror({
    extensions: managerExtensions(props),
    content,
    selection,
    stringHandler,
  });

  return (
    <Remirror
      manager={manager}
      initialContent={initialContent}
      onChange={({ state }: RemirrorEventListenerProps<Remirror.Extensions>) =>
        onChange(state.doc)
      }
    >
      <Toolbar handlers={toolbarHandlers(props)} />
      <Wrap>
        <EditorComponent />
        {editorHandlers(props)}
      </Wrap>
    </Remirror>
  );
};

export default Editor;
