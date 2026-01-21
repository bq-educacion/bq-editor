import React, { JSX } from "react";
import { IEditorProps } from "../Editor";
import {
  AlignButtons,
  BoldButton,
  BulletListButton,
  CodeBlockButton,
  CodeButton,
  getAttrs,
  getExtension,
  HeadingAttrs,
  HeadingSelect,
  ImageAttrs,
  ImageButton,
  IndentButtons,
  ItalicButton,
  LinkAttrs,
  LinkButton,
  OrderedListButton,
  SubButton,
  SupButton,
  TextColorAttrs,
  TextColorButton,
  TextHighlightAttrs,
  TextHighlightButton,
  TableAttrs,
  TableButton,
  UnderlineButton,
} from "../extensions";

const toolbarHandlers = ({
  colorHandler,
  extensions = [],
}: IEditorProps): JSX.Element[][] => {
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
  const sub = getExtension("sub", extensions);
  const sup = getExtension("sup", extensions);
  const textColor = getExtension("text-color", extensions);
  const textHighlight = getExtension("text-highlight", extensions);
  const table = getExtension("table", extensions);
  const underline = getExtension("underline", extensions);

  const handlers = [
    [heading && <HeadingSelect {...(getAttrs(heading) as HeadingAttrs)} />],
    [bulletList && <BulletListButton />, orderedList && <OrderedListButton />],
    [
      italic && <ItalicButton />,
      bold && <BoldButton />,
      underline && <UnderlineButton />,
    ],
    [align && <AlignButtons />],
    [indent && <IndentButtons />],
    [
      textHighlight && (
        <TextHighlightButton
          {...(getAttrs(textHighlight) as TextHighlightAttrs)}
          colorHandler={colorHandler}
        />
      ),
      textColor && (
        <TextColorButton
          {...(getAttrs(textColor) as TextColorAttrs)}
          colorHandler={colorHandler}
        />
      ),
    ],
    [table && <TableButton {...(getAttrs(table) as TableAttrs)} />],
    [
      sub && <SubButton />,
      sup && <SupButton />,
      image && <ImageButton {...(getAttrs(image) as ImageAttrs)} />,
      link && <LinkButton {...(getAttrs(link) as LinkAttrs)} />,
    ],
    [code && <CodeButton />, codeBlock && <CodeBlockButton />],
  ];

  return handlers.filter(
    (elements) => elements.filter((element) => element !== undefined).length > 0
  ) as JSX.Element[][];
};

export default toolbarHandlers;
