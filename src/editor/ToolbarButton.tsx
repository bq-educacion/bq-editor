import styled from "@emotion/styled";
import Button from "../button";
import { colors } from "../theme";
import { height } from "./Toolbar";

export default styled(Button)`
  background-color: ${colors.white};
  border-color: ${colors.white};
  border-radius: 0;
  color: ${colors.dark};
  min-height: ${height}px;
  min-width: ${height}px;
  margin: 1px;
  padding: 5px;

  &.active,
  &:hover {
    color: ${colors.white};
  }
`;
