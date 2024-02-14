import styled from "@emotion/styled";
import {
  Alignment,
  Placement,
  autoPlacement,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { FC, useEffect, useState } from "react";
import { adjustColorOpacity, colors } from "../theme";
import { createPortal } from "react-dom";

interface IFloatingProps {
  alignment?: Alignment;
  allowedPlacements?: Placement[];
  children: JSX.Element;
  className?: string;
  isOpen?: boolean;
  offset?: number | [number, number];
  padding?: number;
  placement?: "top" | "bottom" | "left" | "right";
  target: JSX.Element;
}

const Floating: FC<IFloatingProps> = ({
  alignment,
  allowedPlacements,
  children,
  className,
  offset: offsetProp = 10,
  isOpen: isOpenProp = false,
  padding = 10,
  placement = "bottom",
  target,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    middleware: [
      ...(allowedPlacements || alignment
        ? [autoPlacement({ alignment, allowedPlacements })]
        : []),
      offset(
        typeof offsetProp === "number"
          ? offsetProp
          : { mainAxis: offsetProp[0], crossAxis: offsetProp[1] }
      ),
      flip(),
      shift({ padding }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context, { toggle: true });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {target}
      </div>
      {isOpen &&
        createPortal(
          <Container
            className={`${className || ""} bq-editor-floating`}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {children}
          </Container>,
          document.body
        )}
    </>
  );
};

export default Floating;

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 ${adjustColorOpacity(colors.dark, 0.5)};
  color: ${colors.dark};
  z-index: 1000;
`;
