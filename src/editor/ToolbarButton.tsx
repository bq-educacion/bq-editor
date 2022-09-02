import styled from "@emotion/styled";
import Button from "../button";
import { colors } from "../theme";
import { height } from "./Toolbar";

const ToolbarButton = styled(Button)`
  min-height: calc(${height}px - 10px);
  margin: 5px;
  min-width: calc(${height}px - 10px);
  padding: 5px;

  &.active {
    background-color: ${colors.white};
    border: 1px solid ${colors.orange2};
    color: ${colors.orange2};
  }
`;

export default ToolbarButton;
