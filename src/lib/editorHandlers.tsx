import React from "react";
import { IEditorProps } from "../Editor";
import { CharacterCountIndicator } from "../extensions";

const editorHandlers = ({ maxLength }: IEditorProps) => {
  return <>{maxLength && <CharacterCountIndicator maxLength={maxLength} />}</>;
};

export default editorHandlers;
