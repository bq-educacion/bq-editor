import { CountExtension, CountStrategy } from "@remirror/extension-count";
import langCss from "refractor/lang/css.js";
import langJavascript from "refractor/lang/javascript.js";
import langJson from "refractor/lang/json.js";
import langMarkdown from "refractor/lang/markdown.js";
import langTypescript from "refractor/lang/typescript.js";
import { AnyExtension, Static } from "remirror";
import {
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  TextColorExtension,
  UnderlineExtension,
} from "../extensions";
import { IEditorProps } from "..";

const managerExtensions = ({
  codeLanguage,
  enableImageResizing,
  extensions = [],
  headingLevels,
  maximumStrategy,
  maximum,
  placeholder,
  stringHandler,
}: IEditorProps) => {
  const extensionsFlat = extensions.flat();

  return () =>
    [
      ...(extensionsFlat.includes("bold") ? [new BoldExtension({})] : []),
      ...(extensionsFlat.includes("bulletList")
        ? [new BulletListExtension({})]
        : []),
      ...(extensionsFlat.includes("code") ? [new CodeExtension({})] : []),
      ...(extensionsFlat.includes("codeBlock")
        ? [
            new CodeBlockExtension({
              defaultLanguage: codeLanguage,
              supportedLanguages: [
                langCss,
                langJavascript,
                langJson,
                langMarkdown,
                langTypescript,
              ],
              syntaxTheme: "base16_ateliersulphurpool_light",
              defaultWrap: true,
            }),
          ]
        : []),
      ...(maximum !== undefined
        ? [
            new CountExtension({
              maximumStrategy: maximumStrategy as Static<CountStrategy>,
              maximum,
            }),
          ]
        : []),
      ...(extensionsFlat.includes("heading")
        ? [new HeadingExtension(headingLevels ? { levels: headingLevels } : {})]
        : []),
      ...(extensionsFlat.includes("image")
        ? [new ImageExtension({ enableResizing: enableImageResizing })]
        : []),
      ...(extensionsFlat.includes("italic") ? [new ItalicExtension({})] : []),
      ...(extensionsFlat.includes("link") ? [new LinkExtension({})] : []),
      ...(stringHandler === "markdown" ? [new MarkdownExtension({})] : []),
      ...(extensionsFlat.includes("orderedList")
        ? [new OrderedListExtension({})]
        : []),
      ...(placeholder ? [new PlaceholderExtension({ placeholder })] : []),
      ...(extensionsFlat.includes("textColor")
        ? [new TextColorExtension({})]
        : []),
      ...(extensionsFlat.includes("underline")
        ? [new UnderlineExtension({})]
        : []),
    ] as AnyExtension[];
};

export default managerExtensions;
