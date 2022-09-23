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
} from "../extensions";

const toolbarHandlers = ({
  codeLanguage,
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
      </>
    ))
  );

export default toolbarHandlers;
