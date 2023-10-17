import React from "react";
import { IEditorProps } from "..";
import {
  CounterAttrs,
  CounterIndicator,
  getAttrs,
  getExtension,
} from "../extensions";

const editorHandlers = ({ extensions = [] }: IEditorProps) => {
  const counter = getExtension("counter", extensions);

  return (
    <>
      {counter && <CounterIndicator {...(getAttrs(counter) as CounterAttrs)} />}
    </>
  );
};

export default editorHandlers;
