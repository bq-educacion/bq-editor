import { Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import {
  htmlToProsemirrorNode,
  ProsemirrorNode,
  prosemirrorNodeToHtml,
} from "remirror";
import CodeEditor from "./CodeEditor";
import { Text, Toolbar, Wrapper } from "./components";
import { defaultExtensions, Extension, MarkdownPreview } from "./extensions";
import { editorHandlers, managerExtensions, toolbarHandlers } from "./lib";
import MarkdownDualEditor from "./MarkdownDualEditor";
import Visor from "./Visor";

import "remirror/styles/extension-code-block.css";
import "remirror/styles/extension-placeholder.css";

export {
  htmlToProsemirrorNode as htmlToEditorNode,
  prosemirrorNodeToHtml as editorNodeToHtml,
  Visor,
};

export type CodeLanguage =
  | "css"
  | "javascript"
  | "json"
  | "markdown"
  | "typescript";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
export type StringHandler = "html" | "markdown";

export type IEditorProps = {
  codeLanguage?: CodeLanguage;
  dualEditor?: boolean;
  editable?: boolean;
  extensions?: Extension[][];
  initialContent?: string;
  onChange?: (doc: ProsemirrorNode) => void;
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
};

const Editor: FC<IEditorProps> = (props) => {
  let extensions = props.extensions || defaultExtensions;
  const {
    codeLanguage,
    dualEditor,
    editable,
    initialContent: content,
    onChange,
    selection = "end",
    stringHandler,
  } = props;

  if (stringHandler === "markdown") {
    extensions = extensions.filter(
      (extensionsArray) =>
        extensionsArray.filter(
          ({ name }) =>
            name !== "text-align" &&
            name !== "text-color" &&
            name !== "underline"
        ).length > 0
    );
  }

  if (stringHandler === "markdown" && dualEditor) {
    const input = {
      extensions,
      ...props,
    };

    return (
      <Wrapper className="bq-editor">
        <MarkdownDualEditor {...input}>
          <Toolbar
            className="bq-editor-toolbar"
            handlers={toolbarHandlers(input)}
          />
          <Text className="bq-editor-text">{editorHandlers(input)}</Text>
        </MarkdownDualEditor>
      </Wrapper>
    );
  }

  if (codeLanguage) {
    const input = {
      extensions: [
        [
          {
            name: "code-block",
            attrs: {
              language: codeLanguage,
            },
          },
        ],
      ] as Extension[][],
      ...props,
    };

    return (
      <Wrapper className="bq-editor">
        <CodeEditor {...input}>
          <Text className="bq-editor-text" code />
        </CodeEditor>
      </Wrapper>
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
    <Wrapper className="bq-editor">
      <Remirror
        editable={editable}
        manager={manager}
        state={state}
        onChange={({ state }) => {
          setState(state);
          onChange?.(state.doc);
        }}
      >
        <Toolbar
          className="bq-editor-toolbar"
          handlers={toolbarHandlers(input, setState)}
        />
        <Text className="bq-editor-text">{editorHandlers(input)}</Text>
        {stringHandler === "markdown" && !dualEditor && <MarkdownPreview />}
      </Remirror>
    </Wrapper>
  );
};

export default Editor;
