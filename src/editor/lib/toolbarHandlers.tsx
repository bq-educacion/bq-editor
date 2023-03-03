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
  { extensions = [] }: IEditorProps,
  setState?: (state: EditorState) => void
) =>
  extensions.map((extensionsArray) =>
    extensionsArray.map(({ name, attrs }, index) => (
      <React.Fragment key={index}>
        {name === "bold" && <BoldButton />}
        {name === "bullet-list" && <BulletListButton />}
        {name === "code" && <CodeButton />}
        {name === "code-block" && <CodeBlockButton {...attrs} />}
        {name === "heading" && <HeadingButtons levels={attrs.levels} />}
        {name === "image" && <ImageButton {...attrs} />}
        {name === "italic" && <ItalicButton />}
        {name === "link" && <LinkButton />}
        {name === "ordered-list" && <OrderedListButton />}
        {name === "text-align" && setState && (
          <TextAlignButtons setState={setState} />
        )}
        {name === "text-color" && <TextColorButton {...attrs} />}
        {name === "underline" && <UnderlineButton />}
      </React.Fragment>
    ))
  );

export default toolbarHandlers;
