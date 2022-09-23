import React from "react";
import { IEditorProps } from "..";
import { Counter, MarkdownPreview } from "../extensions";

const editorHandlers = ({
  dualEditor,
  maximumStrategy,
  maximum,
  stringHandler
}: IEditorProps) => (
  <>
    {maximum !== undefined && <Counter maximumStrategy={maximumStrategy} maximum={maximum} />}
    {stringHandler === "markdown" && !dualEditor && <MarkdownPreview />}
  </>
);

export default editorHandlers;
