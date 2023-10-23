import styled from "@emotion/styled";
import React, { FC, MutableRefObject, useEffect } from "react";
import { adjustColorOpacity, colors } from "../../theme";

interface IModalProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  parentRef?: MutableRefObject<HTMLDivElement>;
}

const Modal: FC<IModalProps> = ({
  children,
  className,
  isOpen,
  onClose,
  parentRef,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        parentRef?.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    if (parentRef && onClose && isOpen) {
      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    } else {
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, parentRef, onClose]);

  if (!isOpen) return null;

  return <Container className={className}>{children}</Container>;
};

export default Modal;

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 ${adjustColorOpacity(colors.dark, 0.5)};
  color: ${colors.dark};
  padding: 20px;
  position: absolute;
  transform: translate(-50%, 0);
  top: 50px;
  left: 50%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 386px;

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
