import styled from "@emotion/styled";
import Select from "../select";
import { colors } from "../theme";

const height = 40; // px

export default styled(Select)`
  background-color: ${colors.white};
  border: none;
  border-radius: 0;
  color: ${colors.dark};
  min-height: ${height}px;
  min-width: ${height}px;
  margin: 1px;
  padding: 5px;
  width: 165px;

  &.active,
  &:hover {
    background-color: ${colors.grey1};
    color: ${colors.white};

    > div:last-of-type:not(:first-of-type) {
      background-color: ${colors.white};
      color: ${colors.dark};
    }
  }

  > div:last-of-type:not(:first-of-type) {
    border-radius: 0;
    border-color: ${colors.grey4};
    top: -5px;
  }
`;
