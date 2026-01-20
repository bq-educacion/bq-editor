import cx from "classnames";
import { Remirror, useRemirror } from "@remirror/react";
import React, { CSSProperties, FC, JSX } from "react";
import {
  htmlToProsemirrorNode,
  ProsemirrorNode,
  prosemirrorNodeToHtml,
} from "remirror";
import CodeEditor from "./CodeEditor";
import MarkdownDualEditor from "./MarkdownDualEditor";
import Visor from "./Visor";
import { Counter, Text, Toolbar, Wrapper } from "./components";
import { defaultExtensions, Extension, MarkdownPreview } from "./extensions";
import { checkEmptyEditor, managerExtensions, toolbarHandlers } from "./lib";

export {
  htmlToProsemirrorNode as htmlToEditorNode,
  prosemirrorNodeToHtml as editorNodeToHtml,
  Visor,
};

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
export type StringHandler = "html" | "markdown";

export type IEditorProps = {
  className?: string;
  codeEditor?: boolean;
  colorHandler?: (
    onChange: (value?: string) => void,
    value?: string
  ) => JSX.Element;
  dualEditor?: boolean;
  editable?: boolean;
  extensions?: Extension[];
  initialContent?: string;
  maxLength?: { value: number; truncate?: boolean };
  counter?: boolean;
  onChange?: (doc?: ProsemirrorNode) => void;
  onFullScreen?: (e: React.MouseEvent) => void;
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
  style?: CSSProperties;
  styleText?: CSSProperties;
  getImageUrl?: (id: string) => Promise<string>;
};

const Editor: FC<IEditorProps> = (props) => {
  let extensions = props.extensions || defaultExtensions;
  const {
    className,
    codeEditor,
    counter,
    dualEditor,
    editable,
    initialContent: content,
    onChange,
    onFullScreen,
    selection = "end",
    stringHandler,
    style,
    styleText,
  } = props;

  if (stringHandler === "markdown") {
    extensions = extensions.filter(
      (ext) =>
        (typeof ext === "string" ? ext !== "align" : ext.name !== "align") &&
        (typeof ext === "string"
          ? ext !== "text-color"
          : ext.name !== "text-color") &&
        (typeof ext === "string"
          ? ext !== "text-highlight"
          : ext.name !== "text-highlight") &&
        (typeof ext === "string"
          ? ext !== "underline"
          : ext.name !== "underline")
    );
  }

  if (stringHandler === "markdown" && dualEditor) {
    const input = {
      extensions,
      ...props,
    };

    return (
      <Wrapper className={cx(className, "bq-editor")} style={style}>
        <MarkdownDualEditor {...input}>
          <Toolbar
            className="bq-editor-toolbar"
            handlers={toolbarHandlers(input)}
            onFullScreen={onFullScreen}
          />
          <Text className="bq-editor-text"></Text>
        </MarkdownDualEditor>
      </Wrapper>
    );
  }

  if (codeEditor) {
    const input = {
      extensions: [
        {
          name: "code-block",
        },
      ] as Extension[],
      ...props,
    };

    return (
      <Wrapper className={cx(className, "bq-editor")} style={style}>
        <CodeEditor {...input}>
          <Text className="bq-editor-text" codeEditor />
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

  const length =
    state.doc.content.size -
    2 -
    ((state.doc.content["content"] || []).length - 1);

  return (
    <Wrapper
      className={cx(className, "bq-editor")}
      style={style}
      styleText={styleText}
    >
      <Remirror
        editable={editable}
        manager={manager}
        state={state}
        onChange={({ state }) => {
          setState(state);
          onChange?.(checkEmptyEditor(state) ? undefined : state.doc);
        }}
      >
        <Toolbar
          className="bq-editor-toolbar"
          handlers={toolbarHandlers(input)}
          onFullScreen={onFullScreen}
        />
        <Text className="bq-editor-text">
          {(counter || props.maxLength) && (
            <Counter maxLength={props.maxLength} length={length} />
          )}
        </Text>
        {stringHandler === "markdown" && !dualEditor && <MarkdownPreview />}
      </Remirror>
    </Wrapper>
  );
};

export default Editor;
