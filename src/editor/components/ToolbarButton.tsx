import styled from "@emotion/styled";
import Button from "../../atoms/button";
import { colors } from "../../theme";

export default styled(Button)`
  background-color: ${colors.white};
  border-radius: 0;
  border: none;
  color: ${colors.dark};
  width: 38px;
  padding: 0;

  svg {
    height: 14px;
    max-width: 16px;
  }

  &.active,
  &:hover {
    background-color: ${colors.dark};
    color: ${colors.white};
  }
`;
