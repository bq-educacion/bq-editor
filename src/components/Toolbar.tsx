import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState, JSX } from "react";
import { colors } from "../theme";
import AngleIcon from "../icons/Angle";
import CloseIcon from "../icons/Close";
import FullScreenIcon from "../icons/FullScreen";
import GearIcon from "../icons/Gear";
import ToolbarFloating from "./ToolbarFloating";

interface IToolbarProps {
  className?: string;
  handlers: JSX.Element[][];
  onFullScreen?: (e: React.MouseEvent) => void;
}

const mobile = 300;

const Toolbar: FC<IToolbarProps> = ({ className, handlers, onFullScreen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [hasConfig, setHasConfig] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const hasFullScreen = !!onFullScreen;
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleConfigOpen = () => {
    window.dispatchEvent(new CustomEvent("floating-close"));
    setIsConfigOpen(true);
  };

  const scrollTo = (left: number) => {
    ref.current?.scrollBy({ left, behavior: "smooth" });
  };

  const getBarGroup = (
    elements: JSX.Element[],
    index: number,
    dropdown?: boolean
  ) =>
    (dropdown ? elements[0]?.type.name !== "HeadingSelect" : true) && (
      <BarGroup dropdown={dropdown} key={index}>
        {elements.map((element, jndex) => (
          <React.Fragment key={jndex}>{element}</React.Fragment>
        ))}
      </BarGroup>
    );

  useEffect(() => {
    if (handlers) {
      const onScroll = () => {
        if (!ref.current) return;
        const { scrollWidth, clientWidth } = ref.current;
        if (clientWidth <= mobile) {
          setHasConfig(true);
          setHasScroll(false);
          return;
        } else {
          setHasConfig(false);
          setHasScroll(scrollWidth > clientWidth);
        }
      };

      onScroll();
      ref.current?.addEventListener("scroll", onScroll);
      ref.current?.addEventListener("resize", onScroll);
      return () => {
        ref.current?.removeEventListener("scroll", onScroll);
        ref.current?.removeEventListener("resize", onScroll);
      };
    }
  }, [handlers, ref.current]);

  useEffect(() => {
    if (handlers) {
      const onFloatingClose = () => setIsConfigOpen(false);

      window.addEventListener("floating-close", onFloatingClose);
      return () =>
        window.removeEventListener("floating-close", onFloatingClose);
    }
  }, [handlers]);

  if (!handlers) return null;

  return (
    <BarWrapper className={className}>
      {hasScroll && (
        <ScrollButton start={1} onClick={() => scrollTo(-220)}>
          <AngleIcon />
        </ScrollButton>
      )}
      <BarContainer ref={ref}>
        <BarContent
          hasConfig={hasConfig}
          hasScroll={hasScroll}
          hasFullScreen={hasFullScreen}
        >
          {hasConfig ? (
            <>
              {handlers.map(
                (elements, index) => index === 0 && getBarGroup(elements, index)
              )}
              {handlers.length > 1 && (
                <Floating
                  isOpen={isConfigOpen}
                  keepOpen
                  allowedPlacements={["bottom-start"]}
                  offset={[-41, 50 + (hasFullScreen ? 40 : 0)]}
                  target={
                    <BarButton onClick={handleConfigOpen}>
                      <GearIcon />
                    </BarButton>
                  }
                >
                  <>
                    <CloseButton onClick={() => setIsConfigOpen(false)}>
                      <CloseIcon />
                    </CloseButton>
                    {handlers.map(
                      (elements, index) =>
                        index > 0 && getBarGroup(elements, index, true)
                    )}
                  </>
                </Floating>
              )}
              {hasFullScreen && (
                <BarButton
                  onClick={(e: React.MouseEvent) => {
                    onFullScreen(e);
                    setIsConfigOpen(false);
                  }}
                  style={{ borderLeft: `1px solid ${colors.grey4}` }}
                >
                  <FullScreenIcon />
                </BarButton>
              )}
            </>
          ) : (
            <>
              {handlers.map((elements, index) => getBarGroup(elements, index))}
            </>
          )}
        </BarContent>
      </BarContainer>
      {hasScroll && (
        <>
          {hasFullScreen && (
            <ScrollButton onClick={onFullScreen} offset={40}>
              <FullScreenIcon />
            </ScrollButton>
          )}
          <ScrollButton onClick={() => scrollTo(220)}>
            <AngleIcon />
          </ScrollButton>
        </>
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
  min-height: 40px;
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
  box-sizing: border-box;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BarContent = styled.div<{
  hasConfig?: boolean;
  hasScroll?: boolean;
  hasFullScreen?: boolean;
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

  ${({ hasScroll, hasFullScreen }) =>
    hasScroll &&
    css`
      padding-left: 40px;
      padding-right: ${hasFullScreen ? 80 : 40}px;
    `}
`;

// const BarHeader = styled.div`
//   display: flex;
//   align-items: center;
//   border-right: 1px solid ${colors.grey4};
//   height: 40px;
// `;

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

const CloseButton = styled(BarButton)`
  background-color: ${colors.grey6};

  > svg {
    color: ${colors.grey4};
  }
`;

const ScrollButton = styled(BarButton)<{ start?: number; offset?: number }>`
  background-color: ${colors.grey5};
  border-right: 1px solid ${colors.grey4};
  border-left: 1px solid ${colors.grey4};
  z-index: 1;
  position: absolute;
  top: 0;
  right: ${({ offset }) => offset || 0}px;

  ${({ start }) =>
    start &&
    css`
      left: 0;
      right: unset;

      > svg {
        transform: rotate(180deg);
      }
    `}
`;

const Floating = styled(ToolbarFloating)`
  flex-direction: column;
  border: 1px solid ${colors.grey4};
  box-shadow: none;
  overflow: hidden;
  padding: 0;
  width: 40px;
`;
