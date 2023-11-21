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

  const [scroll, setScroll] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);

  const scrollTo = (left: number) => {
    ref.current?.scrollBy({ left, behavior: "smooth" });
  };

  const onScroll = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setHasScroll(scrollWidth > clientWidth);
    setScroll(scrollLeft / (scrollWidth - clientWidth));
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
    <BarWrapper className={className}>
      {hasScroll && scroll > 0 && (
        <ScrollButton left onClick={() => scrollTo(-120)}>
          <Angle />
        </ScrollButton>
      )}
      <BarContainer ref={ref}>
        <BarContent hasScroll={hasScroll} scroll={scroll}>
          {handlers.map((elements, index) => (
            <BarGroup key={index}>
              {elements.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
              ))}
            </BarGroup>
          ))}
        </BarContent>
      </BarContainer>
      {hasScroll && scroll < 1 && (
        <ScrollButton onClick={() => scrollTo(120)}>
          <Angle />
        </ScrollButton>
      )}
    </BarWrapper>
  );
};

export default Toolbar;

const BarContainer = styled.div`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-bottom: none;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  color: ${colors.dark};
  position: relative;
  height: 40px;
  z-index: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BarContent = styled.div<{ hasScroll?: boolean; scroll: number }>`
  position: absolute;
  display: flex;

  ${({ hasScroll, scroll }) =>
    hasScroll &&
    css`
      margin-left: ${scroll > 0 ? 40 : 0}px;
      margin-right: ${scroll < 1 ? 40 : 0}px;
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

const BarWrapper = styled.div`
  position: relative;
`;

const ScrollButton = styled.div<{ left?: boolean }>`
  background-color: ${colors.grey5};
  border-right: 1px solid ${colors.grey4};
  border-left: 1px solid ${colors.grey4};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 0;

  ${({ left }) =>
    left &&
    css`
      left: 0;
      right: unset;

      > svg {
        transform: rotate(180deg);
      }
    `}
`;
