import React, { FC } from "react";
import styled from "@emotion/styled";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { DocExtension } from "remirror/extensions";
import { StringHandler } from "./Editor";
import { CodeBlockExtension, defaultExtensions, Extension } from "./extensions";
import { managerExtensions } from "./lib";
import { styles } from "./theme";

export type IVisorProps = {
  codeEditor?: boolean;
  extensions?: Extension[];
  content?: string;
  stringHandler?: StringHandler;
};

const Visor: FC<IVisorProps> = (props) => {
  const {
    codeEditor,
    extensions = defaultExtensions,
    content,
    stringHandler,
  } = props;

  let input = {
    extensions,
    ...props,
  };

  if (codeEditor) {
    input = {
      ...props,
      extensions: [
        {
          name: "code-block",
        },
      ] as Extension[],
    };
  }

  const { manager, state: initialContent } = useRemirror({
    ...(codeEditor
      ? {
          extensions: () => [
            new DocExtension({ content: "codeBlock" }),
            new CodeBlockExtension({
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
  .remirror-editor {
    ${styles}
  }
`;
