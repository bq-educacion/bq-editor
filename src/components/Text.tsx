import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useCommands,
  useEditorEvent,
  useRemirrorContext,
} from "@remirror/react";
import React, { CompositionEvent, FC, useCallback, useState } from "react";
import { composeText } from "../lib";
import { colors, styles } from "../theme";

interface ITextProps {
  children?: React.ReactNode;
  className?: string;
  codeEditor?: boolean;
}

const insertCustomText = (text: string) => {
  return ({
    tr,
    dispatch,
  }: {
    tr: any; // eslint-disable-line
    dispatch?: any; // eslint-disable-line
  }) => {
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

const Container = styled.div<{ codeEditor?: boolean }>`
  position: relative;
  background-color: ${colors.white};
  border: 1px solid ${colors.grey4};
  border-radius: 2px;
  color: ${colors.dark};
  padding: 20px;
  white-space: pre-wrap;
  min-height: 100px;
  flex: 1;
  position: relative;
  overflow: auto;

  &::before {
    content: "";
    border-top: 1px solid ${colors.grey4};
    position: absolute;
    height: 0;
    left: -1px;
    right: -1px;
    top: -1px;
  }

  &:focus-within {
    border-color: ${colors.dark};

    &::before {
      border-color: ${colors.dark};
    }
  }

  &:not(:first-of-type) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .remirror-is-empty:first-of-type::before {
    position: absolute;
    color: ${colors.grey2};
    pointer-events: none;
    height: 0;
    font-style: italic;
    content: attr(data-placeholder);
  }

  .remirror-editor {
    outline: none;
    ${styles}
  }

  ${(props) =>
    props.codeEditor &&
    css`
      padding: 0;
      min-height: unset;

      .remirror-editor {
        height: 100%;

        pre {
          margin: 0 !important;
        }
      }
    `}
`;
