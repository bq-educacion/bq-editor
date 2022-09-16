import styled from "@emotion/styled";
import { colors } from "../theme";

export default styled.div`
  .remirror-editor-wrapper > div {
    align-items: center;
    background-color: ${colors.white};
    border: 2px solid ${colors.grey4};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: none;
    color: ${colors.dark};
    outline: none;
    padding: 10px;
    white-space: pre-wrap;
    min-height: 100px;

    p.remirror-is-empty:before {
      content: attr(data-placeholder);
      color: ${colors.grey2};
      display: inline-block;
      position: absolute;
    }

    p {
      margin: 0;
    }
  }
`;
