import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../theme";

export type ISelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: {
    hidden: boolean;
    label: string;
    value: string;
  }[];
};

const Select: FC<ISelectProps> = (props) => (
  <StyledSelect {...props}>
    {props.options.map(
      (option) =>
        !option.hidden && (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
    )}
  </StyledSelect>
);

export default Select;

const StyledSelect = styled.select<ISelectProps>`
  background-color: ${colors.white};
  border: 1px solid ${colors.dark};
  border-radius: 4px;
  color: ${colors.dark};
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-out;

  &:disabled {
    background-color: ${colors.grey5};
    border: 1px solid ${colors.grey5};
    color: ${colors.grey4};
    pointer-events: none;
  }
`;
