import {
  ReactExtensions,
  Remirror,
  useRemirror,
  UseRemirrorReturn,
} from "@remirror/react";
import { createContextState } from "create-context-state";
import React, { FC } from "react";
import { AnyExtension, RemirrorEventListenerProps } from "remirror";
import { DocExtension } from "remirror/extensions";
import { IEditorProps } from "./Editor";
import { CodeBlockExtension } from "./extensions";
import { managerExtensions } from "./lib";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: UseRemirrorReturn<ReactExtensions<any>[number]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markdown: UseRemirrorReturn<ReactExtensions<any>>;
}

interface Context extends Props {
  setMarkdown: (markdown: string) => void;
  setVisual: (markdown: string) => void;
}

const [EditorProvider, useEditor] = createContextState<Context, Props>(
  ({ props }) => {
    return {
      ...props,
      setMarkdown: (text: string) => {
        return props.markdown.getContext()?.setContent({
          type: "doc",
          content: [
            {
              type: "codeBlock",
              attrs: { language: "markdown" },
              content: text ? [{ type: "text", text }] : undefined,
            },
          ],
        });
      },
      setVisual: (markdown: string) => {
        return props.visual.getContext()?.setContent(markdown);
      },
    };
  }
);

const MarkdownDualEditor: FC<IEditorProps & { children: React.ReactNode }> = ({
  children,
  initialContent: content,
  stringHandler,
  ...props
}) => {
  const input = {
    stringHandler,
    ...props,
  };

  const visual = useRemirror({
    ...managerExtensions(input),
    content,
    stringHandler: stringHandler as "html" | "markdown",
  });

  const markdown = useRemirror({
    extensions: () => [
      new DocExtension({ content: "codeBlock" }),
      new CodeBlockExtension({
        defaultWrap: true,
      }),
    ],
    builtin: {
      exitMarksOnArrowPress: false,
    },
    stringHandler: stringHandler as "html" | "markdown",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Provider: any = EditorProvider;

  return (
    <Provider visual={visual} markdown={markdown}>
      <VisualEditor>{children}</VisualEditor>
      <MarkdownTextEditor />
    </Provider>
  );
};

const VisualEditor: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { visual, setMarkdown } = useEditor();

  return (
    <Remirror
      manager={visual.manager}
      onChange={({
        helpers,
        state,
      }): RemirrorEventListenerProps<AnyExtension> | null => {
        setMarkdown(helpers.getMarkdown(state));
        return null;
      }}
      initialContent={visual.state}
    >
      {children}
    </Remirror>
  );
};

const MarkdownTextEditor: FC = () => {
  const { markdown, setVisual } = useEditor();

  return (
    <Remirror
      manager={markdown.manager}
      autoRender="end"
      onChange={({
        helpers,
        state,
      }): RemirrorEventListenerProps<AnyExtension> | null => {
        setVisual(helpers.getText({ state }));
        return null;
      }}
    />
  );
};

export default MarkdownDualEditor;
