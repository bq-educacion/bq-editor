import styled from "@emotion/styled";
import Button from "../../atoms/button";
import { colors } from "../../theme";

export default styled(Button)`
  background-color: ${colors.white};
  border: none;
  color: ${colors.dark};
  min-height: 40px;
  min-width: 40px;
  padding: 5px;

  svg {
    height: 20px;
    width: auto;
  }

  &.active,
  &:hover {
    background-color: ${colors.grey5};
  }
`;
