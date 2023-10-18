import styled from "@emotion/styled";
import React, { FC } from "react";
import { colors } from "../../theme";

interface IToolbarProps {
  className?: string;
  handlers: JSX.Element[][];
}

const Toolbar: FC<IToolbarProps> = ({ className, handlers }) =>
  handlers.length === 0 ? null : (
    <Bar className={className}>
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
`;

const Bar = styled.div`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: none;
  color: ${colors.dark};
  display: flex;
  flex-wrap: wrap;
`;

const BarGroup = styled.div`
  display: flex;
  position: relative;

  > button,
  > div {
    position: relative;

    &:not(:first-child) {
      margin-left: 1px;

      &::before {
        content: "";
        border-left: 1px solid ${colors.grey4};
        position: absolute;
        height: 20px;
        left: -1px;
        top: 0;
        transform: translateY(50%);
      }
    }
  }

  &::before {
    content: "";
    border-bottom: 1px solid ${colors.grey4};
    position: absolute;
    height: 0;
    left: 0;
    bottom: -1px;
    width: 100%;
    z-index: 1;
  }
`;
