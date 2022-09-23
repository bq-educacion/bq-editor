import { CountExtension, CountStrategy } from "@remirror/extension-count";
import langCss from "refractor/lang/css.js";
import langJavascript from "refractor/lang/javascript.js";
import langJson from "refractor/lang/json.js";
import langMarkdown from "refractor/lang/markdown.js";
import langTypescript from "refractor/lang/typescript.js";
import { Static } from "remirror";
import {
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
} from "../extensions";
import { defaultExtensions, IEditorProps } from "..";

const managerExtensions = ({
  codeLanguage,
  extensions = defaultExtensions,
  maximumStrategy,
  maximum,
  placeholder,
  stringHandler,
}: IEditorProps) => {
  const extensionsFlat = extensions.flat();

  return () => [
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
    ...(extensionsFlat.includes("heading") ? [new HeadingExtension({})] : []),
    ...(extensionsFlat.includes("italic") ? [new ItalicExtension({})] : []),
    ...(extensionsFlat.includes("link") ? [new LinkExtension({})] : []),
    ...(stringHandler === "markdown" ? [new MarkdownExtension({})] : []),
    ...(extensionsFlat.includes("orderedList")
      ? [new OrderedListExtension({})]
      : []),
    ...(placeholder ? [new PlaceholderExtension({ placeholder })] : []),
  ];
};

export default managerExtensions;
