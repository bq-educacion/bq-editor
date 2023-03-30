import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useCommands,
  useEditorEvent,
  useRemirrorContext,
} from "@remirror/react";
import React, { CompositionEvent, FC, useCallback, useState } from "react";
import { colors } from "../../theme";
import composeText from "../lib/composeText";

interface ITextProps {
  children?: React.ReactNode;
  className?: string;
  code?: boolean;
}

const insertCustomText = (text: string) => {
  return ({ tr, dispatch }: { tr: any; dispatch?: any }) => {
    // eslint-disable-line
    dispatch?.(tr.insertText(text));
    return true;
  };
};

const Text: FC<ITextProps> = ({ children, ...props }) => {
  const { getRootProps } = useRemirrorContext();
  useEditorEvent("textInput", ({ text }) => onInput(text));
  const { customDispatch } = useCommands();

  const [composition, setComposition] = useState<{
    block: boolean;
    text: string;
  }>();

  const handleInput = useCallback(
    (text: string) => {
      setComposition(undefined);
      customDispatch(insertCustomText(text));
    },
    [customDispatch]
  );

  const onComposition = (e: CompositionEvent) =>
    setComposition({
      block: composition?.text === e.data ? false : true,
      text: e.data,
    });

  const onInput = (text: string) => {
    if (!composition || (composition.text === text && !composition.block))
      return false;
    if (composition.text === text && composition.block) return true;
    handleInput(composeText(text, composition.text));
    return true;
  };

  return (
    <Container
      {...props}
      onCompositionUpdate={onComposition}
      {...getRootProps()}
    >
      {children}
    </Container>
  );
};

export default Text;

const Container = styled.div<{ code?: boolean }>`
  position: relative;
  background-color: ${colors.white};
  border: 1px solid ${colors.grey4};
  border-radius: 4px;
  color: ${colors.dark};
  padding: 0 1em;
  white-space: pre-wrap;
  min-height: 100px;
  flex: 1;

  .remirror-is-empty:first-of-type::before {
    position: absolute;
    color: ${colors.grey2};
    pointer-events: none;
    height: 0;
    font-style: italic;
    content: attr(data-placeholder);
  }

  :not(:first-of-type) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }

  .remirror-editor {
    outline: none;
  }

  ${(props) =>
    props.code &&
    css`
      min-height: unset;

      .remirror-editor {
        height: 100%;

        > pre {
          padding: 1em 0;
          border-radius: 4px;
          box-sizing: border-box;
          height: 100%;
          margin: 0 !important;
        }
      }
    `}
`;
