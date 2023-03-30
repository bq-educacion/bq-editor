import { BoldAttrs, BoldName } from "./Bold";
import { BulletListAttrs, BulletListName } from "./BulletList";
import { CodeAttrs, CodeName } from "./Code";
import { CodeBlockAttrs, CodeBlockName } from "./CodeBlock";
import { CounterAttrs, CounterName } from "./Counter";
import { HeadingAttrs, HeadingName } from "./Heading";
import { ImageAttrs, ImageName } from "./Image";
import { ItalicAttrs, ItalicNname } from "./Italic";
import { LinkAttrs, LinkName } from "./Link";
import { OrderedListAttrs, OrderedListName } from "./OrderedList";
import { TextAlignAttrs, TextAlignName } from "./TextAlign";
import { TextColorAttrs, TextColorName } from "./TextColor";
import { UnderlineAttrs, UnderlineName } from "./Underline";

export * from "./Bold";
export * from "./BulletList";
export * from "./Code";
export * from "./CodeBlock";
export * from "./Counter";
export * from "./Events";
export * from "./HardBreak";
export * from "./Heading";
export * from "./Image";
export * from "./Italic";
export * from "./Link";
export * from "./ListItem";
export * from "./Markdown";
export * from "./OrderedList";
export * from "./Placeholder";
export * from "./TextAlign";
export * from "./TextColor";
export * from "./Underline";

export type Extension =
  | {
      name: typeof BoldName;
      attrs?: BoldAttrs;
    }
  | {
      name: typeof BulletListName;
      attrs?: BulletListAttrs;
    }
  | {
      name: typeof CodeName;
      attrs?: CodeAttrs;
    }
  | {
      name: typeof CodeBlockName;
      attrs?: CodeBlockAttrs;
    }
  | {
      name: typeof CounterName;
      attrs?: CounterAttrs;
    }
  | {
      name: typeof HeadingName;
      attrs?: HeadingAttrs;
    }
  | {
      name: typeof ImageName;
      attrs?: ImageAttrs;
    }
  | {
      name: typeof ItalicNname;
      attrs?: ItalicAttrs;
    }
  | {
      name: typeof LinkName;
      attrs?: LinkAttrs;
    }
  | {
      name: typeof OrderedListName;
      attrs?: OrderedListAttrs;
    }
  | {
      name: typeof TextAlignName;
      attrs?: TextAlignAttrs;
    }
  | {
      name: typeof TextColorName;
      attrs?: TextColorAttrs;
    }
  | {
      name: typeof UnderlineName;
      attrs?: UnderlineAttrs;
    };

export const defaultExtensions: Extension[][] = [
  [
    {
      name: "heading",
    },
    {
      name: "bold",
    },
    {
      name: "italic",
    },
    {
      name: "underline",
    },
  ],
  [
    {
      name: "code",
    },
    {
      name: "code-block",
    },
  ],
  [
    {
      name: "text-color",
    },
  ],
  [
    {
      name: "bullet-list",
    },
    {
      name: "ordered-list",
    },
  ],
  [
    {
      name: "text-align",
    },
  ],
  [
    {
      name: "link",
    },
  ],
  [
    {
      name: "image",
    },
  ],
];
