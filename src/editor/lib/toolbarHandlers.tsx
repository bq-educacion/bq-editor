import React from "react";
import { EditorState } from "remirror";
import { IEditorProps } from "..";
import {
  BoldButton,
  BulletListButton,
  CodeBlockButton,
  CodeButton,
  HeadingButtons,
  ImageButton,
  ItalicButton,
  LinkButton,
  OrderedListButton,
  TextAlignButtons,
  TextColorButton,
  UnderlineButton,
} from "../extensions";

const toolbarHandlers = (
  {
    acceptMedia,
    enableImageResizing,
    codeLanguage,
    color,
    extensions = [],
    headingLevels,
    onUploadMedia,
  }: IEditorProps,
  setState?: (state: EditorState) => void
) =>
  extensions.map((extensionsArray) =>
    extensionsArray.map((extension, index) => (
      <React.Fragment key={index}>
        {extension === "bold" && <BoldButton />}
        {extension === "bulletList" && <BulletListButton />}
        {extension === "code" && <CodeButton />}
        {extension === "codeBlock" && (
          <CodeBlockButton language={codeLanguage} />
        )}
        {extension === "heading" && <HeadingButtons levels={headingLevels} />}
        {extension === "image" && (
          <ImageButton
            accept={acceptMedia?.image}
            enableResizing={enableImageResizing}
            onUpload={onUploadMedia}
          />
        )}
        {extension === "italic" && <ItalicButton />}
        {extension === "link" && <LinkButton />}
        {extension === "orderedList" && <OrderedListButton />}
        {extension === "textAlign" && setState && (
          <TextAlignButtons setState={setState} />
        )}
        {extension === "textColor" && <TextColorButton color={color} />}
        {extension === "underline" && <UnderlineButton />}
      </React.Fragment>
    ))
  );

export default toolbarHandlers;
