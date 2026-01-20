import {
  AnyExtension,
  CommandsExtension,
  IdentifierSchemaAttributes,
} from "remirror";
import {
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  getAttrs,
  getExtension,
  HardBreakExtension,
  HeadingExtension,
  ImageAttrs,
  ImageExtension,
  ImagePreventDropExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  PlaceholderExtension,
  SubExtension,
  SupExtension,
  TextColorExtension,
  TextHighlightExtension,
  TextPlainExtension,
  UnderlineExtension,
} from "../extensions";
import { IEditorProps } from "../Editor";

const managerExtensions = ({
  extensions = [],
  maxLength,
  placeholder,
  stringHandler,
  getImageUrl,
}: IEditorProps): {
  extensions: () => AnyExtension[];
  extraAttributes: IdentifierSchemaAttributes[];
} => {
  const bold = getExtension("bold", extensions);
  const bulletList = getExtension("bullet-list", extensions);
  const code = getExtension("code", extensions);
  const codeBlock = getExtension("code-block", extensions);
  const heading = getExtension("heading", extensions);
  const image = getExtension("image", extensions);
  const italic = getExtension("italic", extensions);
  const link = getExtension("link", extensions);
  const orderedList = getExtension("ordered-list", extensions);
  const sub = getExtension("sub", extensions);
  const sup = getExtension("sup", extensions);
  const textColor = getExtension("text-color", extensions);
  const textHighlight = getExtension("text-highlight", extensions);
  const underline = getExtension("underline", extensions);

  const imgAttrs = image ? (getAttrs(image) as ImageAttrs) : undefined;
  const headingAttrs = heading ? getAttrs(heading) : undefined;
  const linkAttrs = link ? getAttrs(link) : undefined;

  return {
    extensions: () => [
      new CommandsExtension({}),
      new HardBreakExtension({}),
      new NodeFormattingExtension({}),
      new TextPlainExtension({
        maxLength: maxLength?.truncate ? maxLength?.value : undefined,
        preventDropImage: imgAttrs?.preventDrop,
      }),
      ...(bold ? [new BoldExtension({})] : []),
      ...(bulletList ? [new BulletListExtension({})] : []),
      ...(code ? [new CodeExtension({})] : []),
      ...(codeBlock
        ? [
            new CodeBlockExtension({
              defaultWrap: true,
            }),
          ]
        : []),
      ...(headingAttrs ? [new HeadingExtension(headingAttrs)] : []),
      ...(imgAttrs
        ? [
            imgAttrs.preventDrop
              ? new ImagePreventDropExtension({
                  ...imgAttrs,
                  getImageUrl,
                } as unknown as ImageAttrs)
              : new ImageExtension(imgAttrs),
          ]
        : []),
      ...(italic ? [new ItalicExtension({})] : []),
      ...(linkAttrs ? [new LinkExtension(linkAttrs)] : []),
      ...(stringHandler === "markdown" ? [new MarkdownExtension({})] : []),
      ...(orderedList ? [new OrderedListExtension({})] : []),
      ...(sub ? [new SubExtension({})] : []),
      ...(sup ? [new SupExtension({})] : []),
      ...(placeholder ? [new PlaceholderExtension({ placeholder })] : []),
      ...(textColor ? [new TextColorExtension({})] : []),
      ...(textHighlight ? [new TextHighlightExtension({})] : []),
      ...(underline ? [new UnderlineExtension({})] : []),
      ...(bulletList || orderedList ? [new ListItemExtension({})] : []),
    ],
    extraAttributes: [],
  };
};

export default managerExtensions;
