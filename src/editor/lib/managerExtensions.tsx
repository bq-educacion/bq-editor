import { AnyExtension, IdentifierSchemaAttributes } from "remirror";
import {
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  CounterAttrs,
  CountExtension,
  EventsExtension,
  HardBreakExtension,
  HeadingAttrs,
  HeadingExtension,
  ImageAttrs,
  ImageExtension,
  ItalicExtension,
  LinkAttrs,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  PlaceholderExtension,
  // TextAlignExtension,
  // TextAlignExtraAttributes,
  TextColorExtension,
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
  const extensionsFlat = extensions.flat();

  const counterAttrs = extensionsFlat.find(({ name }) => name === "counter")
    ?.attrs as CounterAttrs;
  const headingAttrs = extensionsFlat.find(({ name }) => name === "heading")
    ?.attrs as HeadingAttrs;
  const imageAttrs = extensionsFlat.find(({ name }) => name === "image")
    ?.attrs as ImageAttrs;
  const linkAttrs = extensionsFlat.find(({ name }) => name === "link")
    ?.attrs as LinkAttrs;

  return {
    extensions: () =>
      [
        new EventsExtension(),
        ...(extensionsFlat.some(({ name }) => name === "bold")
          ? [new BoldExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "bullet-list")
          ? [new BulletListExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "code")
          ? [new CodeExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "code-block")
          ? [
              new CodeBlockExtension({
                defaultWrap: true,
              }),
            ]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "counter")
          ? [new CountExtension(counterAttrs)]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "heading")
          ? [new HeadingExtension(headingAttrs?.levels ? headingAttrs : {})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "image")
          ? [new ImageExtension(imageAttrs)]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "italic")
          ? [new ItalicExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "link")
          ? [new LinkExtension({ defaultTarget: "_blank", ...linkAttrs })]
          : []),
        ...(stringHandler === "markdown" ? [new MarkdownExtension({})] : []),
        ...(extensionsFlat.some(({ name }) => name === "ordered-list")
          ? [new OrderedListExtension({})]
          : []),
        ...(placeholder ? [new PlaceholderExtension({ placeholder })] : []),
        ...(extensionsFlat.some(({ name }) => name === "node-formatting")
          ? [new NodeFormattingExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "text-color")
          ? [new TextColorExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "underline")
          ? [new UnderlineExtension({})]
          : []),
        ...(extensionsFlat.some(({ name }) => name === "bullet-list") ||
        extensionsFlat.some(({ name }) => name === "ordered-list")
          ? [new ListItemExtension({})]
          : []),
        new HardBreakExtension({}),
      ] as AnyExtension[],
    extraAttributes: [
      // ...(extensionsFlat.some(({ name }) => name === "text-align")
      //   ? [TextAlignExtraAttributes]
      //   : []),
    ],
  };
};

export default managerExtensions;
