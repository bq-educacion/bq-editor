import React from "react";
import { IEditorProps } from "..";
import { CounterAttrs, CounterIndicator } from "../extensions";

const editorHandlers = ({ extensions = [] }: IEditorProps) => {
  const extensionsFlat = extensions.flat();

  return (
    <>
      {extensionsFlat.some(({ name }) => name === "counter") && (
        <CounterIndicator
          {...(extensionsFlat.find(({ name }) => name === "counter")
            .attrs as CounterAttrs)}
        />
      )}
    </>
  );
};

export default editorHandlers;
