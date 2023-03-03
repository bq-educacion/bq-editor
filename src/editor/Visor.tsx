import React, { FC } from "react";
import langCss from "refractor/lang/css.js";
import langJavascript from "refractor/lang/javascript.js";
import langJson from "refractor/lang/json.js";
import langMarkdown from "refractor/lang/markdown.js";
import langTypescript from "refractor/lang/typescript.js";
import styled from "@emotion/styled";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { DocExtension } from "remirror/extensions";
import { CodeBlockExtension } from "./extensions";
import { managerExtensions } from "./lib";
import { CodeLanguage, StringHandler } from ".";
import { defaultExtensions, Extension } from "./extensions";

export type IVisorProps = {
  codeLanguage?: CodeLanguage;
  extensions?: Extension[][];
  content?: string;
  stringHandler?: StringHandler;
};

const Visor: FC<IVisorProps> = (props) => {
  const {
    codeLanguage,
    extensions = defaultExtensions,
    content,
    stringHandler,
  } = props;

  let input = {
    extensions,
    ...props,
  };

  if (codeLanguage) {
    input = {
      ...props,
      extensions: [
        [
          {
            name: "code-block",
            attrs: {
              language: codeLanguage,
            },
          },
        ],
      ] as Extension[][],
    };
  }

  const { manager, state: initialContent } = useRemirror({
    ...(codeLanguage
      ? {
          extensions: () => [
            new DocExtension({ content: "codeBlock" }),
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
          ],
        }
      : managerExtensions(input)),
    content:
      !stringHandler && content ? Object.create(JSON.parse(content)) : content,
    stringHandler,
  });

  return (
    <Container className="bq-editor-visor">
      <Remirror
        editable={false}
        manager={manager}
        initialContent={initialContent}
      >
        <EditorComponent />
      </Remirror>
    </Container>
  );
};

export default Visor;

export const Container = styled.div`
  > div > div > pre {
    border-radius: 4px;
    margin: 0 !important;
  }
`;
