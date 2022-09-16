import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import { prosemirrorNodeToHtml, RemirrorEventListenerProps } from "remirror";
import { extensions } from "../types.d";
import Extensions, { Counter, Placeholder } from "./extensions";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
type StringHandler = "html" | "markdown";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

export type IEditorProps = {
  counter?: { maximumStrategy?: "characters" | "words"; maximum: number };
  extensions?: extensions[][];
  initialContent?: string;
  onChange?: (doc: any) => void;
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
}

const Editor: FC<IEditorProps> = ({
  counter,
  extensions: activeExtensions = [
    [
      extensions.bold,
      extensions.italic,
      extensions.code,
      extensions.link
    ],
    [
      extensions.heading
    ],
    [
      extensions.bulletList,
      extensions.orderedList
    ],
  ],
  initialContent,
  onChange,
  placeholder,
  selection = "start",
  stringHandler,
}) => {
  const { manager, state } = useRemirror({
    extensions: () => [
      ...activeExtensions.flat().map((extension) => {
        const extensionFunction = Extensions.find(
          (ext) => ext.name === extension
        )?.extensionFunction;
        return extensionFunction && new extensionFunction;
      }),
      ...(counter ? [new Counter.extensionFunction(counter)] : []),
      ...(placeholder ? [new Placeholder.extensionFunction({ placeholder })] : [])
    ],
    content: initialContent,
    selection,
    stringHandler
  });

  const editorHandlers = activeExtensions.flat().map((extension) => {
    const HandlerComponent = Extensions.find(
      (ext) => ext.name === extension
    )?.editorHandler;
    return (
      HandlerComponent && <HandlerComponent key={extension} />
    );
  });

  const toolbarHandlers = activeExtensions.map((extensionArray) =>
    extensionArray.map((extension) => {
      const HandlerComponent = Extensions.find(
        (ext) => ext.name === extension
      )?.toolbarHandler;
      return HandlerComponent && <HandlerComponent key={extension} />;
    })
  );

  return (
    <Remirror
      manager={manager}
      initialContent={state} 
      onChange={(props: RemirrorEventListenerProps<Remirror.Extensions>) => onChange(stringHandler === "html" ? prosemirrorNodeToHtml(props.state.doc) : props.state.doc)}
    >
      <Toolbar
        handlers={toolbarHandlers.filter((handlers) =>
          handlers.some((handler) => handler !== undefined)
        ) as JSX.Element[][]}
      />
      <Wrap>
        <EditorComponent />
      </Wrap>
      {counter && <Counter.editorHandler {...counter} />}
      {editorHandlers}
    </Remirror>
  );
};

export default Editor;
