import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { colors } from "../../theme";

interface ITextProps {
  children?: React.ReactNode;
  className?: string;
  code?: boolean;
}

const Text: FC<ITextProps> = ({ children, ...props }) => {
  const { getRootProps } = useRemirrorContext();

  return (
    <Container {...props} {...getRootProps()}>
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
