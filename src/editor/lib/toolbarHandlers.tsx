import React from "react";
import { IEditorProps } from "..";
import { BoldButton, BulletListButton, CodeBlockButton, CodeButton, HeadingButtons, ItalicButton, LinkButton, OrderedListButton } from "../extensions";

const toolbarHandlers = ({
  codeLanguage,
  extensions: activeExtensions
}: IEditorProps) => activeExtensions.map((extensionsArray) => 
  extensionsArray.map((extension) => (
    <>
      {extension == "bold" && <BoldButton />}
      {extension == "bulletList" && <BulletListButton />}
      {extension == "code" && <CodeButton />}
      {extension == "codeBlock" && <CodeBlockButton language={codeLanguage} />}
      {extension == "heading" && <HeadingButtons />}
      {extension == "italic" && <ItalicButton />}
      {extension == "link" && <LinkButton />}
      {extension == "orderedList" && <OrderedListButton />}
    </>
  )
));

export default toolbarHandlers;
