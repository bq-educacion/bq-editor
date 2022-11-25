import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import {
  htmlToProsemirrorNode,
  ProsemirrorNode,
  prosemirrorNodeToHtml,
} from "remirror";
import CodeEditor from "./code-editor";
import MarkdownDualEditor from "./markdown-dual-editor";
import { editorHandlers, managerExtensions, toolbarHandlers } from "./lib";
import { Toolbar, Wrap } from "./utils";
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
export type StringHandler = "code" | "html" | "markdown";

export const defaultExtensions = [
  ["heading", "bold", "italic", "underline"],
  ["code", "codeBlock"],
  ["textColor"],
  ["bulletList", "orderedList"],
  ["textAlign"],
  ["link"],
  ["image"],
];

export type IEditorProps = {
  acceptMedia?: {
    image: string[];
  };
  autoLink?: boolean;
  codeLanguage?: CodeLanguage;
  color?: string;
  dualEditor?: boolean;
  editable?: boolean;
  enableImageResizing?: boolean;
  extensions?: string[][];
  headingLevels?: number[];
  initialContent?: string;
  maximumStrategy?: MaximumStrategy;
  maximum?: number;
  onChange?: (doc: ProsemirrorNode) => void;
  onUploadMedia?: (file: File) => Promise<string>;
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
};

const Editor: FC<IEditorProps> = (props) => {
  let extensions = props.extensions || defaultExtensions;
  const {
    dualEditor,
    editable,
    initialContent: content,
    onChange,
    selection = "start",
    stringHandler,
  } = props;

  if (stringHandler === "markdown") {
    extensions = extensions.filter(
      (extensionsArray) =>
        extensionsArray.filter(
          (extension) =>
            extension !== "textAlign" &&
            extension !== "textColor" &&
            extension !== "underline"
        ).length > 0
    );
  }

  if (stringHandler === "markdown" && dualEditor) {
    const input = {
      extensions,
      ...props,
    };

    return (
      <MarkdownDualEditor {...input}>
        <Toolbar handlers={toolbarHandlers(input)} />
        <Wrap>
          <EditorComponent />
          {editorHandlers(input)}
        </Wrap>
      </MarkdownDualEditor>
    );
  }

  if (stringHandler === "code") {
    const input = {
      extensions: [["codeBlock"]],
      ...props,
    };

    return (
      <CodeEditor {...input}>
        <Wrap code>
          <EditorComponent />
        </Wrap>
      </CodeEditor>
    );
  }

  const input = {
    extensions,
    ...props,
  };

  const { manager, state, setState } = useRemirror({
    ...managerExtensions(input),
    content:
      !stringHandler && content ? Object.create(JSON.parse(content)) : content,
    selection,
    stringHandler,
  });

  return (
    <Remirror
      editable={editable}
      manager={manager}
      state={state}
      onChange={({ state }) => {
        setState(state);
        onChange?.(state.doc);
      }}
    >
      <Toolbar handlers={toolbarHandlers(input, setState)} />
      <Wrap>
        <EditorComponent />
        {editorHandlers(input)}
      </Wrap>
    </Remirror>
  );
};

export default Editor;
