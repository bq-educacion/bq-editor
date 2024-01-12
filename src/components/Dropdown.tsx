import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import TetherComponent from "react-tether";
import { adjustColorOpacity, colors } from "../theme";

interface IDropdownProps {
  attachment?: string;
  children: JSX.Element;
  className?: string;
  isOpen?: boolean;
  offset?: string;
  onClose?: () => void;
  target: JSX.Element;
  targetAttachment?: string;
}

const Dropdown: FC<IDropdownProps> = ({
  attachment = "top right",
  children,
  className,
  offset = "0 0",
  isOpen = false,
  onClose,
  target,
  targetAttachment = "bottom left",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const attachmentEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref?.current &&
        !ref.current.contains(event.target as Node) &&
        !attachmentEl.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    if (ref && onClose && open) {
      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    } else {
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open, ref, onClose]);

  return (
    <div ref={ref}>
      <TetherComponent
        attachment={attachment}
        targetAttachment={targetAttachment}
        offset={offset}
        style={{ zIndex: "9999" }}
        renderTarget={(ref) => (
          <div ref={ref} onClick={() => setOpen(!open)}>
            {target}
          </div>
        )}
        renderElement={(ref) =>
          open ? (
            <Container
              ref={(el) => {
                (ref as React.MutableRefObject<HTMLDivElement>).current = el;
                attachmentEl.current = el;
              }}
              className={className}
            >
              {children}
            </Container>
          ) : null
        }
      />
    </div>
  );
};

export default Dropdown;

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 ${adjustColorOpacity(colors.dark, 0.5)};
  color: ${colors.dark};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    cursor: pointer;
    color: ${colors.orange1};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 13px;
    width: 100%;

    button {
      flex: 1;
    }

    label {
      font-weight: bold;
      margin-bottom: -5px;
      min-width: 45px;
    }
  }
`;
