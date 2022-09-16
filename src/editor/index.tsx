import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import { htmlToProsemirrorNode, prosemirrorNodeToHtml, RemirrorEventListenerProps } from "remirror";
import { extensions } from "../types.d";
import Extensions, { Counter, Placeholder } from "./extensions";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";

export {
  htmlToProsemirrorNode as htmlToEditorNode,
  prosemirrorNodeToHtml as editorNodeToHtml
}

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
type StringHandler = "html" | "markdown";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

type MaximumStrategy = "characters" | "words";

export type IEditorProps = {
  maximumStrategy?: MaximumStrategy;
  maximum?: number;
  extensions?: extensions[][];
  initialContent?: string;
  onChange?: (doc: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
}

const Editor: FC<IEditorProps> = ({
  maximumStrategy = "characters",
  maximum,
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
      ...(maximum !== undefined ? [new Counter.extensionFunction({ maximumStrategy, maximum })] : []),
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
      onChange={(props: RemirrorEventListenerProps<Remirror.Extensions>) => onChange(props.state.doc)}
    >
      <Toolbar
        handlers={toolbarHandlers.filter((handlers) =>
          handlers.some((handler) => handler !== undefined)
        ) as JSX.Element[][]}
      />
      <Wrap>
        <EditorComponent />
        {maximum !== undefined && <Counter.editorHandler maximumStrategy={maximumStrategy} maximum={maximum}  />}
      </Wrap>
      {editorHandlers}
    </Remirror>
  );
};

export default Editor;
