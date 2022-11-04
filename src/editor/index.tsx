import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import {
  AnyExtension,
  htmlToProsemirrorNode,
  ProsemirrorNode,
  prosemirrorNodeToHtml,
  RemirrorEventListenerProps,
} from "remirror";
import CodeEditor from "./CodeEditor";
import MarkdownDualEditor from "./MarkdownDualEditor";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";
import { editorHandlers, managerExtensions, toolbarHandlers } from "./lib";
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
  const {
    dualEditor,
    editable,
    extensions = defaultExtensions,
    initialContent: content,
    onChange,
    selection = "start",
    stringHandler,
  } = props;

  const input = {
    extensions,
    ...props,
  };

  if (stringHandler === "markdown" && dualEditor) {
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
    return (
      <CodeEditor {...input}>
        <Wrap code>
          <EditorComponent />
        </Wrap>
      </CodeEditor>
    );
  }

  const { manager, state: initialContent } = useRemirror({
    extensions: managerExtensions(input),
    content:
      !stringHandler && content ? Object.create(JSON.parse(content)) : content,
    selection,
    stringHandler,
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
      <Toolbar handlers={toolbarHandlers(input)} />
      <Wrap>
        <EditorComponent />
        {editorHandlers(input)}
      </Wrap>
    </Remirror>
  );
};

export default Editor;
