import styled from "@emotion/styled";
import Select from "../select";
import { colors } from "../theme";

export default styled(Select)`
  background-color: ${colors.white};
  border: none;
  color: ${colors.dark};
  min-height: 40px;
  min-width: 40px;
  margin: 1px;
  padding: 5px;
  width: 165px;

  &.active,
  &:hover {
    background-color: ${colors.grey5};

    > div:last-of-type:not(:first-of-type) {
      background-color: ${colors.white};
      color: ${colors.dark};
    }
  }

  > div:last-of-type:not(:first-of-type) {
    border-color: ${colors.grey4};
  }
`;
