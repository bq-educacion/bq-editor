import { AlignAttrs, AlignName } from "./Align";
import { BoldAttrs, BoldName } from "./Bold";
import { BulletListAttrs, BulletListName } from "./BulletList";
import { CodeAttrs, CodeName } from "./Code";
import { CodeBlockAttrs, CodeBlockName } from "./CodeBlock";
import { CounterAttrs, CounterName } from "./Counter";
import { HeadingAttrs, HeadingName } from "./Heading";
import { ImageAttrs, ImageName } from "./Image";
import { IndentAttrs, IndentName } from "./Indent";
import { ItalicAttrs, ItalicNname } from "./Italic";
import { LinkAttrs, LinkName } from "./Link";
import { OrderedListAttrs, OrderedListName } from "./OrderedList";
import { SubAttrs, SubName } from "./Sub";
import { SupAttrs, SupName } from "./Sup";
import { TextColorAttrs, TextColorName } from "./TextColor";
import { TextHighlightAttrs, TextHighlightName } from "./TextHighlight";
import { UnderlineAttrs, UnderlineName } from "./Underline";

export * from "./Align";
export * from "./Bold";
export * from "./BulletList";
export * from "./Code";
export * from "./CodeBlock";
export * from "./Counter";
export * from "./HardBreak";
export * from "./Heading";
export * from "./Image";
export * from "./Indent";
export * from "./Italic";
export * from "./Link";
export * from "./ListItem";
export * from "./Markdown";
export * from "./Align";
export * from "./OrderedList";
export * from "./Placeholder";
export * from "./Sub";
export * from "./Sup";
export * from "./TextColor";
export * from "./TextHighlight";
export * from "./Underline";

export type Extension =
  | typeof AlignName
  | {
      name: typeof AlignName;
      attrs?: AlignAttrs;
    }
  | typeof BoldName
  | {
      name: typeof BoldName;
      attrs?: BoldAttrs;
    }
  | typeof BulletListName
  | {
      name: typeof BulletListName;
      attrs?: BulletListAttrs;
    }
  | typeof CodeName
  | {
      name: typeof CodeName;
      attrs?: CodeAttrs;
    }
  | typeof CodeBlockName
  | {
      name: typeof CodeBlockName;
      attrs?: CodeBlockAttrs;
    }
  | typeof CounterName
  | {
      name: typeof CounterName;
      attrs?: CounterAttrs;
    }
  | typeof HeadingName
  | {
      name: typeof HeadingName;
      attrs?: HeadingAttrs;
    }
  | typeof ImageName
  | {
      name: typeof ImageName;
      attrs?: ImageAttrs;
    }
  | typeof IndentName
  | {
      name: typeof IndentName;
      attrs?: IndentAttrs;
    }
  | typeof ItalicNname
  | {
      name: typeof ItalicNname;
      attrs?: ItalicAttrs;
    }
  | typeof LinkName
  | {
      name: typeof LinkName;
      attrs?: LinkAttrs;
    }
  | typeof OrderedListName
  | {
      name: typeof OrderedListName;
      attrs?: OrderedListAttrs;
    }
  | typeof SubName
  | {
      name: typeof SubName;
      attrs?: SubAttrs;
    }
  | typeof SupName
  | {
      name: typeof SupName;
      attrs?: SupAttrs;
    }
  | typeof TextColorName
  | {
      name: typeof TextColorName;
      attrs?: TextColorAttrs;
    }
  | typeof TextHighlightName
  | {
      name: typeof TextHighlightName;
      attrs?: TextHighlightAttrs;
    }
  | typeof UnderlineName
  | {
      name: typeof UnderlineName;
      attrs?: UnderlineAttrs;
    };

export const getExtension = (name: string, extensions: Extension[]) =>
  extensions.find((ext) =>
    typeof ext === "string" ? ext === name : ext.name === name
  );
export const getAttrs = (ext: Extension) =>
  typeof ext === "string" ? {} : ext.attrs;

export const defaultExtensions: Extension[] = [
  "align",
  "bold",
  "bullet-list",
  "code",
  "code-block",
  "heading",
  "image",
  "indent",
  "italic",
  "link",
  "ordered-list",
  "sub",
  "sup",
  "text-color",
  "text-highlight",
  "underline",
];
