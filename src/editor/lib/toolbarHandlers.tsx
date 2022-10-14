import React from "react";
import { defaultExtensions, IEditorProps } from "..";
import {
  BoldButton,
  BulletListButton,
  CodeBlockButton,
  CodeButton,
  HeadingButtons,
  ItalicButton,
  LinkButton,
  OrderedListButton,
  TextColorButton,
  UnderlineButton,
} from "../extensions";

const toolbarHandlers = ({
  codeLanguage,
  color,
  extensions = defaultExtensions,
}: IEditorProps) =>
  extensions.map((extensionsArray) =>
    extensionsArray.map((extension) => (
      <>
        {extension === "bold" && <BoldButton />}
        {extension === "bulletList" && <BulletListButton />}
        {extension === "code" && <CodeButton />}
        {extension === "codeBlock" && (
          <CodeBlockButton language={codeLanguage} />
        )}
        {extension === "heading" && <HeadingButtons />}
        {extension === "italic" && <ItalicButton />}
        {extension === "link" && <LinkButton />}
        {extension === "orderedList" && <OrderedListButton />}
        {extension === "textColor" && <TextColorButton color={color} />}
        {extension === "underline" && <UnderlineButton />}
      </>
    ))
  );

export default toolbarHandlers;
