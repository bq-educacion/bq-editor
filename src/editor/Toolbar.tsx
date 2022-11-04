import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../theme";

interface IToolbarProps {
  handlers: JSX.Element[][];
}

const Toolbar: FC<IToolbarProps> = ({ handlers }) => (
  <Wrap empty={handlers.length === 0}>
    {handlers.map((elements, index) => (
      <React.Fragment key={index}>
        {elements}
        {index < handlers.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </Wrap>
);

export default Toolbar;

const Divider = styled.span`
  height: 30px;
  border-left: 1px solid ${colors.grey4};
`;

const Wrap = styled.div<{ empty: boolean }>`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${colors.dark};
  display: flex;
  flex-wrap: wrap;
  position: relative;
  gap: 5px;
  padding: 5px;

  ${(props) =>
    props.empty &&
    css`
      border-bottom: none;
    `}
`;
