import React from "react";
import { IEditorProps } from "..";
import {
  AlignButtons,
  BoldButton,
  BulletListButton,
  CodeBlockButton,
  CodeButton,
  Extension,
  getAttrs,
  getExtension,
  HeadingAttrs,
  HeadingButtons,
  ImageAttrs,
  ImageButton,
  IndentButtons,
  ItalicButton,
  LinkButton,
  OrderedListButton,
  TextColorAttrs,
  TextColorButton,
  UnderlineButton,
} from "../extensions";

const toolbarHandlers = ({ extensions = [] }: IEditorProps) => {
  const align = getExtension("align", extensions);
  const bold = getExtension("bold", extensions);
  const bulletList = getExtension("bullet-list", extensions);
  const code = getExtension("code", extensions);
  const codeBlock = getExtension("code-block", extensions);
  const heading = getExtension("heading", extensions);
  const image = getExtension("image", extensions);
  const indent = getExtension("indent", extensions);
  const italic = getExtension("italic", extensions);
  const link = getExtension("link", extensions);
  const orderedList = getExtension("ordered-list", extensions);
  const textColor = getExtension("text-color", extensions);
  const underline = getExtension("underline", extensions);

  return [
    [heading && <HeadingButtons {...(getAttrs(heading) as HeadingAttrs)} />],
    [bulletList && <BulletListButton />, orderedList && <OrderedListButton />],
    [
      italic && <ItalicButton />,
      bold && <BoldButton />,
      underline && <UnderlineButton />,
    ],
    [align && <AlignButtons />],
    [indent && <IndentButtons />],
    [
      textColor && (
        <TextColorButton {...(getAttrs(textColor) as TextColorAttrs)} />
      ),
    ],
    [
      image && <ImageButton {...(getAttrs(image) as ImageAttrs)} />,
      link && <LinkButton />,
    ],
    [code && <CodeButton />, codeBlock && <CodeBlockButton />],
  ];
};

export default toolbarHandlers;
