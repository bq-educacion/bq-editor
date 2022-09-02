import styled from "@emotion/styled";
import { colors } from "../theme";

export default styled.div`
  .remirror-editor-wrapper > div {
    align-items: center;
    background-color: ${colors.white};
    border: 1px solid ${colors.grey4};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: ${colors.dark};
    outline: none;
    padding: 1px 10px;
    white-space: pre-wrap;
    border-top: none;
  }
`;
