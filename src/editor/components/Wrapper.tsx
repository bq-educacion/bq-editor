import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "../../theme";

export default styled.div<{ code?: boolean }>`
  position: relative;

  > div > div {
    background-color: ${colors.white};
    border: 1px solid ${colors.grey4};
    border-radius: 4px;
    color: ${colors.dark};
    padding: 1px 1em;
    outline: none;
    white-space: pre-wrap;
    min-height: 100px;
    height: 100%;

    ${(props) =>
      props.code &&
      css`
        padding: 0;
        min-height: unset;

        > pre {
          border-radius: 4px;
          margin: 0 !important;
        }
      `}
  }

  :not(:first-of-type) > div > div {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }
`;
