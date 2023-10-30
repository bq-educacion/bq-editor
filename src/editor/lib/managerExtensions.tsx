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
  CountExtension,
  getAttrs,
  getExtension,
  HardBreakExtension,
  HeadingExtension,
  ImageExtension,
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
  UnderlineExtension,
} from "../extensions";
import { IEditorProps } from "..";

const managerExtensions = ({
  extensions = [],
  placeholder,
  stringHandler,
}: IEditorProps): {
  extensions: () => AnyExtension[];
  extraAttributes: IdentifierSchemaAttributes[];
} => {
  const bold = getExtension("bold", extensions);
  const bulletList = getExtension("bullet-list", extensions);
  const code = getExtension("code", extensions);
  const codeBlock = getExtension("code-block", extensions);
  const counter = getExtension("counter", extensions);
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

  return {
    extensions: () =>
      [
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
        ...(counter ? [new CountExtension(getAttrs(counter))] : []),
        ...(heading ? [new HeadingExtension(getAttrs(heading))] : []),
        ...(image ? [new ImageExtension(getAttrs(image))] : []),
        ...(italic ? [new ItalicExtension({})] : []),
        ...(link
          ? [new LinkExtension({ defaultTarget: "_blank", ...getAttrs(link) })]
          : []),
        ...(stringHandler === "markdown" ? [new MarkdownExtension({})] : []),
        ...(orderedList ? [new OrderedListExtension({})] : []),
        ...(sub ? [new SubExtension({})] : []),
        ...(sup ? [new SupExtension({})] : []),
        ...(placeholder ? [new PlaceholderExtension({ placeholder })] : []),
        ...(textColor ? [new TextColorExtension({})] : []),
        ...(textHighlight ? [new TextHighlightExtension({})] : []),
        ...(underline ? [new UnderlineExtension({})] : []),
        ...(bulletList || orderedList ? [new ListItemExtension({})] : []),
        new CommandsExtension({}),
        new HardBreakExtension({}),
        new NodeFormattingExtension({}),
      ] as AnyExtension[],
    extraAttributes: [],
  };
};

export default managerExtensions;
