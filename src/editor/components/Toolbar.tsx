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
          {elements.map((element, index) => (
            <React.Fragment key={index}>{element}</React.Fragment>
          ))}
        </BarGroup>
      ))}
    </Bar>
  );

export default Toolbar;

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
  border: 1px solid ${colors.grey4};
  border-top: none;
  border-left: none;

  > button,
  > div {
    position: relative;

    + * {
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
`;
