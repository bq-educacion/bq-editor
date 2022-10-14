import styled from "@emotion/styled";
import { colors } from "../theme";

export default styled.div`
  position: relative;

  .remirror-editor-wrapper > div {
    align-items: center;
    background-color: ${colors.white};
    border: 2px solid ${colors.grey5};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: none;
    color: ${colors.dark};
    outline: none;
    padding: 10px;
    white-space: pre-wrap;
    min-height: 100px;

    p {
      margin: 0;
    }
  }
`;
