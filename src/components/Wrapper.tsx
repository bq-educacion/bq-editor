import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties } from "react";

export default styled.div<{
  styleText?: CSSProperties;
}>`
  height: 100%;
  max-height: inherit;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.styleText &&
    css`
      .bq-editor-text {
        background-color: ${props.styleText.backgroundColor};
        color: ${props.styleText.color};
        font-family: ${props.styleText.fontFamily};
        font-size: ${props.styleText.fontSize};

        [data-placeholder]::before {
          color: ${props.styleText.color}!important;
          opacity: 0.5;
        }
      }
    `}
`;
