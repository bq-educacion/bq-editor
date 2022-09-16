import styled from "@emotion/styled";
import Button from "../button";
import { colors } from "../theme";

const height = 40; // px

export default styled(Button)`
  background-color: ${colors.white};
  border-color: ${colors.white};
  border-radius: 0;
  color: ${colors.dark};
  min-height: calc(${height}px - 10px);
  margin: 1px;
  min-width: calc(${height}px - 10px);
  padding: 5px;

  &.active, &:hover {
    color: ${colors.white};
  }
`;
