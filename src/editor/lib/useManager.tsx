import { CountExtension, CountStrategy } from "@remirror/extension-count";
import { useRemirror } from "@remirror/react";
import css from 'refractor/lang/css.js';
import javascript from 'refractor/lang/javascript.js';
import json from 'refractor/lang/json.js';
import markdown from 'refractor/lang/markdown.js';
import typescript from 'refractor/lang/typescript.js';
import { PrimitiveSelection, Static } from "remirror";
import { BoldExtension, BulletListExtension, CodeBlockExtension, CodeExtension, HeadingExtension, ItalicExtension, LinkExtension, OrderedListExtension, PlaceholderExtension } from "remirror/extensions";
import { IEditorProps } from "..";

const useManager = ({
  extensions: activeExtensions,
  initialContent,
  maximumStrategy,
  maximum,
  placeholder,
  selection,
  stringHandler
}: IEditorProps) => {
  const extensionsFlat = activeExtensions.flat();

  const { manager, state } = useRemirror({
    extensions: () => [
      ...(extensionsFlat.includes("bold") ? [new BoldExtension({})] : []),
      ...(extensionsFlat.includes("bulletList") ? [new BulletListExtension({})] : []),
      ...(extensionsFlat.includes("code") ? [new CodeExtension({})] : []),
      ...(extensionsFlat.includes("codeBlock") ? [new CodeBlockExtension({ supportedLanguages: [css, javascript, json, markdown, typescript] })] : []),
      ...(maximum !== undefined ? [new CountExtension({ maximumStrategy: maximumStrategy as Static<CountStrategy>, maximum })] : []),
      ...(extensionsFlat.includes("heading") ? [new HeadingExtension({})] : []),
      ...(extensionsFlat.includes("italic") ? [new ItalicExtension({})] : []),
      ...(extensionsFlat.includes("link") ? [new LinkExtension({})] : []),
      ...(extensionsFlat.includes("orderedList") ? [new OrderedListExtension({})] : []),
      ...(placeholder ? [new PlaceholderExtension({ placeholder })] : [])
    ],
    content: initialContent,
    selection: selection as PrimitiveSelection,
    stringHandler
  });

  return { manager, state };
};

export default useManager;
