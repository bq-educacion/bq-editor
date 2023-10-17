import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../../theme";

interface IToolbarProps {
  className?: string;
  handlers: JSX.Element[][];
}

const Toolbar: FC<IToolbarProps> = ({ className, handlers }) => (
  <Bar
    className={className}
    empty={
      handlers.flatMap((elements) => elements.filter((element) => element))
        .length === 0
    }
  >
    {handlers.map((elements, index) => (
      <BarGroup key={index}>
        {elements}
        <Divider className="bq-editor-toolbar-divider" />
      </BarGroup>
    ))}
  </Bar>
);

export default Toolbar;

const Divider = styled.span`
  height: 40px;
  border-left: 1px solid ${colors.grey4};

  &:first-child {
    display: none;
  }
`;

const Bar = styled.div<{ empty: boolean }>`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${colors.dark};
  display: flex;
  flex-wrap: wrap;

  ${({ empty }) =>
    empty &&
    `
    border-bottom: 0;
    border-bottom-color: transparent;
    padding: 1px;
  `}
`;

const BarGroup = styled.div`
  display: flex;

  button {
    position: relative;

    &:not(:first-of-type) {
      margin-left: 1px;

      &::before {
        content: "";
        border-left: 1px solid ${colors.grey4};
        position: absolute;
        height: 20px;
        left: -1px;
      }
    }
  }
`;
