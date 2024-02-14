import styled from "@emotion/styled";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import React, { FC, useEffect, useRef, useState } from "react";
import { adjustColorOpacity, colors } from "../theme";
import { createPortal } from "react-dom";

interface IFloatingProps {
  children: JSX.Element;
  className?: string;
  isOpen?: boolean;
  offset?: number | [number, number];
  onClose?: () => void;
  placement?: "top" | "bottom" | "left" | "right";
  target: JSX.Element;
}

const Floating: FC<IFloatingProps> = ({
  children,
  className,
  offset: offsetProp = 10,
  isOpen = false,
  onClose,
  placement = "bottom",
  target,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const dropdownEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);

  const middleware = [
    offset(
      typeof offsetProp === "number"
        ? offsetProp
        : { mainAxis: offsetProp[0], crossAxis: offsetProp[1] }
    ),
    flip(),
    shift({ padding: 10 }),
  ];

  computePosition(targetRef.current, dropdownEl.current, {
    placement,
    middleware,
  }).then(({ x, y }) => {
    Object.assign(dropdownEl.current.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !targetRef.current.contains(event.target as Node) &&
        !dropdownEl.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    if (dropdownEl && onClose && open) {
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("mousedown", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
        window.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      return () => {
        window.removeEventListener("click", handleClickOutside);
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, dropdownEl, onClose]);

  return (
    <>
      <div ref={targetRef} onClick={() => setOpen(!open)}>
        {target}
      </div>
      {open &&
        createPortal(
          <Container
            className={`${className} bq-editor-floating`}
            ref={dropdownEl}
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
  position: absolute;
  top: -100%;
  left: -100%;
`;
