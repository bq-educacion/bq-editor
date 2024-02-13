import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import { colors } from "../theme";
import AngleIcon from "../icons/Angle";
import FullScreenIcon from "../icons/FullScreen";
import GearIcon from "../icons/Gear";
import Dropdown from "./Dropdown";

interface IToolbarProps {
  className?: string;
  handlers: JSX.Element[][];
  onFullScreen?: () => void;
}

const mobile = 300;

const Toolbar: FC<IToolbarProps> = ({ className, handlers, onFullScreen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState(0);
  const [hasConfig, setHasConfig] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const heading = handlers.find((elements) =>
    elements.find((element) => element?.type?.name === "HeadingSelect")
  );

  const scrollTo = (left: number) => {
    ref.current?.scrollBy({ left, behavior: "smooth" });
  };

  const getBarGroup = (
    elements: JSX.Element[],
    index: number,
    dropdown?: boolean
  ) =>
    (dropdown ? elements[0].type.name !== "HeadingSelect" : true) && (
      <BarGroup dropdown={dropdown} key={index}>
        {elements.map((element, jndex) => (
          <React.Fragment key={jndex}>{element}</React.Fragment>
        ))}
      </BarGroup>
    );

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      if (clientWidth <= mobile) {
        setHasConfig(true);
        setHasScroll(false);
        setScroll(0);
        return;
      } else {
        setHasConfig(false);
        setHasScroll(scrollWidth > clientWidth);
        setScroll(scrollLeft / (scrollWidth - clientWidth));
      }
    };

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
        <ScrollButton left onClick={() => scrollTo(-220)}>
          <AngleIcon />
        </ScrollButton>
      )}
      <BarContainer ref={ref}>
        <BarContent hasConfig={hasConfig} hasScroll={hasScroll} scroll={scroll}>
          {hasConfig ? (
            <>
              {heading ? (
                [heading].map((elements, index) => getBarGroup(elements, index))
              ) : (
                <div />
              )}
              <StyledDropdown
                attachment="top left"
                className="bq-editor-dropdown"
                isOpen={showConfig}
                onClose={() => setShowConfig(false)}
                offset="1 -10"
                target={
                  <BarButton onClick={() => setShowConfig(true)}>
                    <GearIcon />
                  </BarButton>
                }
                targetAttachment="top right"
              >
                <>
                  {handlers.map((elements, index) =>
                    getBarGroup(elements, index, true)
                  )}
                </>
              </StyledDropdown>
              {!!onFullScreen && (
                <BarButton
                  onClick={onFullScreen}
                  style={{ borderLeft: `1px solid ${colors.grey4}` }}
                >
                  <FullScreenIcon />
                </BarButton>
              )}
            </>
          ) : (
            handlers.map((elements, index) => getBarGroup(elements, index))
          )}
        </BarContent>
      </BarContainer>
      {hasScroll && scroll < 1 && (
        <ScrollButton onClick={() => scrollTo(220)}>
          <AngleIcon />
        </ScrollButton>
      )}
    </BarWrapper>
  );
};

export default Toolbar;

const BarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  height: 40px;
  cursor: pointer;
`;

const BarContainer = styled.div`
  align-items: center;
  border: 1px solid ${colors.grey4};
  border-bottom: none;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  color: ${colors.dark};
  position: relative;
  height: 40px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BarContent = styled.div<{
  hasConfig?: boolean;
  hasScroll?: boolean;
  scroll?: number;
}>`
  position: absolute;
  display: flex;

  ${({ hasConfig }) =>
    hasConfig &&
    css`
      width: 100%;

      > div:first-of-type {
        width: 100%;

        div {
          width: 100%;
        }
      }
    `}

  ${({ hasScroll, scroll }) =>
    hasScroll &&
    css`
      margin-left: ${scroll > 0 ? 40 : 0}px;
      margin-right: ${scroll < 1 ? 40 : 0}px;
    `}
`;

const BarGroup = styled.div<{ dropdown?: boolean }>`
  display: flex;

  ${({ dropdown }) =>
    !dropdown
      ? css`
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
        `
      : css`
          flex-direction: column;
          border-bottom: 1px solid ${colors.grey4};

          &:last-of-type {
            border-bottom: none;
          }

          > button,
          > div {
            position: relative;

            + * {
              margin-top: 1px;

              &::before {
                content: "";
                border-top: 1px solid ${colors.grey4};
                position: absolute;
                width: 20px;
                top: -1px;
                left: 0;
                transform: translateX(50%);
              }
            }
          }
        `}
`;

const BarWrapper = styled.div`
  position: relative;
`;

const ScrollButton = styled(BarButton)<{ left?: boolean }>`
  background-color: ${colors.grey5};
  border-right: 1px solid ${colors.grey4};
  border-left: 1px solid ${colors.grey4};
  z-index: 1;
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

const StyledDropdown = styled(Dropdown)`
  flex-direction: column;
  border: 1px solid ${colors.grey4};
  box-sizing: border-box;
  box-shadow: none;
  overflow: hidden;
  padding: 0;
  width: 40px;
`;