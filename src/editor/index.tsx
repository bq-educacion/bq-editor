import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import React, { FC } from "react";
import Toolbar from "./Toolbar";
import Wrap from "./Wrap";
import Extensions from "./extensions";
import {
  extCounter,
  extensions,
  extHeading,
  extLists,
  extRichText,
} from "../types.d";

// Set the string handler which means the content provided will be automatically handled as html.
// `markdown` is also available when the `MarkdownExtension` is added to the editor.
type StringHandler = "default" | "html" | "markdown";

// Place the cursor at the start of the document. This can also be set to `end`, `all` or a numbered position.
type Selection = "start" | "end" | "all" | number;

type IEditorProps = {
  counter?: { maximumStrategy?: "characters" | "words"; maximum: number };
  extensions?: extensions[][];
  initialContent?: string;
  selection?: Selection;
  stringHandler?: StringHandler;
}

const Editor: FC<IEditorProps> = ({
  counter,
  extensions: activeExtensions = [
    extRichText,
    extHeading,
    extLists,
    extCounter,
  ],
  initialContent,
  selection = "start",
  stringHandler = "default",
}) => {
  const { manager, state } = useRemirror({
    extensions: () =>
      activeExtensions.flat().map((extension) => {
        const extensionFunction = Extensions.find(
          (ext) => ext.name === extension
        )?.extensionFunction;
        const counterArgs = extension === extensions.counter && counter;
        return extensionFunction && new extensionFunction.func(
          extensionFunction?.args || counterArgs || {}
        );
      }),
    content: initialContent,
    selection,
    stringHandler: stringHandler === "default" ? undefined : stringHandler,
  });

  const editorHandlers = activeExtensions.flat().map((extension) => {
    const HandlerComponent = Extensions.find(
      (ext) => ext.name === extension
    )?.editorHandler;
    const counterArgs = extension === extensions.counter && counter;
    return (
      HandlerComponent && <HandlerComponent key={extension} {...counterArgs} />
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
    <Remirror manager={manager} initialContent={state}>
      <Toolbar
        handlers={toolbarHandlers.filter((handlers) =>
          handlers.some((handler) => handler !== undefined)
        ) as JSX.Element[][]}
      />
      <Wrap>
        <EditorComponent />
      </Wrap>
      {editorHandlers}
    </Remirror>
  );
};

export default Editor;
