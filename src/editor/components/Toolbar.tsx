import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import { colors } from "../../theme";
import Angle from "../assets/icons/Angle";

interface IToolbarProps {
  className?: string;
  handlers: JSX.Element[][];
}

const Toolbar: FC<IToolbarProps> = ({ className, handlers }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [left, setLeft] = useState(0);
  const [maxLeft, setMaxLeft] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);

  const scrollTo = (left: number) => {
    setLeft((prev) => Math.max(0, Math.min(prev + left, maxLeft)));
  };

  const onScroll = () => {
    if (!ref.current?.parentElement) return;
    setLeft(0);
    setMaxLeft(ref.current.clientWidth - ref.current.parentElement.clientWidth);
    setHasScroll(
      ref.current.clientWidth > ref.current.parentElement.clientWidth
    );
  };

  useEffect(() => {
    ref.current?.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      ref.current?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!handlers) return null;

  return (
    <Bar className={className}>
      {hasScroll && left > 0 && (
        <ScrollButton left onClick={() => scrollTo(-120)}>
          <Angle />
        </ScrollButton>
      )}
      <BarContent ref={ref} hasScroll={hasScroll} left={left}>
        {handlers.map((elements, index) => (
          <BarGroup key={index}>
            {elements.map((element, index) => (
              <React.Fragment key={index}>{element}</React.Fragment>
            ))}
          </BarGroup>
        ))}
      </BarContent>
      {hasScroll && left < maxLeft && (
        <ScrollButton onClick={() => scrollTo(120)}>
          <Angle />
        </ScrollButton>
      )}
    </Bar>
  );
};

export default Toolbar;

const Bar = styled.div`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-bottom: none;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  color: ${colors.dark};
  position: relative;
  height: 40px;
  z-index: 1;
`;

const BarContent = styled.div<{ hasScroll?: boolean; left: number }>`
  position: absolute;
  display: flex;
  transition: transform 0.2s ease-in-out;

  ${({ hasScroll, left }) =>
    hasScroll &&
    css`
      margin-left: ${left < 0 ? 40 : 0}px;
      margin-right: 40px;
      transform: translateX(-${left}px);
    `}
`;

const BarGroup = styled.div`
  display: flex;
  border-right: 1px solid ${colors.grey4};

  &:last-of-type {
    border-right: none;
  }

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

const ScrollButton = styled.div<{ left?: boolean }>`
  background-color: ${colors.grey5};
  border-right: 1px solid ${colors.grey4};
  border-left: 1px solid ${colors.grey4};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: 2;
  cursor: pointer;
  position: absolute;

  ${({ left }) =>
    left
      ? css`
          left: -1px;

          > svg {
            transform: rotate(180deg);
          }
        `
      : css`
          right: -1px;
        `}
`;
