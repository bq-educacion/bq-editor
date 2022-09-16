import React from "react";
import { IEditorProps } from "..";
import { Counter } from "../extensions";

const editorHandlers = ({
  maximumStrategy,
  maximum
}: IEditorProps) => (
  <>
    {maximum !== undefined && <Counter maximumStrategy={maximumStrategy} maximum={maximum} />}
  </>
);

export default editorHandlers;
