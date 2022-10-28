import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import DropIcon from "./assets/icons/Drop";
import { adjustColorOpacity, colors } from "../theme";

interface IOption {
  active?: boolean;
  disabled?: boolean;
  element?: JSX.Element;
  label: string;
  value: string;
}

export interface ISelectProps {
  className?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  options: IOption[];
  placeholder?: string;
  value?: string;
}

const Select: FC<ISelectProps> = ({
  error,
  onChange,
  options,
  placeholder,
  value,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node) &&
      setExpanded(false);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container error={!!error} ref={wrapperRef} expanded={expanded} {...props}>
      <StyledSelect expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <div>
          {options.find((o) => o.value === value)?.label ||
            options.find((o) => o.active)?.label ||
            placeholder}
        </div>
        <DropIcon />
      </StyledSelect>
      {expanded && (
        <Values>
          {options.length > 0 ? (
            <div>
              {options.map(
                (option, index) =>
                  option.element || (
                    <Value
                      active={value === option.value || option.active}
                      disabled={option.disabled}
                      key={index}
                      onClick={() => (
                        setExpanded(false), onChange?.(option.value)
                      )}
                    >
                      {option.label}
                    </Value>
                  )
              )}
            </div>
          ) : (
            <ValuesEmpty />
          )}
        </Values>
      )}
    </Container>
  );
};

export default Select;

const Container = styled.div<{
  disabled?: boolean;
  error?: boolean;
  expanded: boolean;
}>`
  align-items: center;
  background-color: ${(props) =>
    props.error ? adjustColorOpacity(colors.red3, 0.22) : colors.white};
  border-radius: 5px;
  border: solid 1px ${(props) => (props.error ? colors.red3 : colors.grey3)};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: ${(props) => (props.error ? colors.red3 : colors.dark)};
  cursor: pointer;
  display: flex;
  height: 40px;
  position: relative;

  &.active,
  &:hover {
    border-color: ${(props) => (props.error ? colors.red3 : colors.grey1)};
    z-index: 1;
  }

  ${(props) =>
    props.expanded &&
    css`
      border-color: ${props.error ? colors.red3 : colors.grey1};
      z-index: 1;
    `}

  ${(props) =>
    props.error &&
    css`
      svg {
        color: ${colors.red3};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.grey6};
      border-color: ${colors.grey4};
      pointer-events: none;

      > div > svg {
        color: ${colors.grey4};
      }
    `}
`;

const StyledSelect = styled.div<{ expanded: boolean }>`
  align-items: center;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 100%;
  outline: none;
  padding: 0 15px 0 20px;
  width: 100%;

  > svg {
    height: 10px;
  }

  div {
    flex: 1;
    overflow: hidden;
    padding-right: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    color: ${colors.dark};
    margin-left: 15px;
  }

  &::placeholder {
    color: ${colors.grey3};
  }
`;

const Values = styled.div<{ search?: boolean }>`
  background-color: ${colors.white};
  border-radius: 5px;
  border: solid 1px ${colors.grey3};
  box-shadow: 0 10px 20px 0 ${adjustColorOpacity(colors.dark, 0.2)};
  min-width: 100%;
  position: absolute;
  right: 0;
  top: 5px;
  transform: translateY(45px);
  z-index: 2;
  max-height: 150px;
  overflow-y: scroll;

  > div {
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }

  ::-webkit-scrollbar:vertical {
    display: block;
  }

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    padding: 5px;
    background-color: ${colors.grey1};
    border-radius: 9999px;
    border: 5px solid transparent;
    background-clip: padding-box;
  }
`;

const ValuesEmpty = styled.div`
  justify-content: center;
  height: 70px;
  white-space: nowrap;
`;

const Value = styled.div<{ active: boolean; disabled?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 3px 20px;
  position: relative;
  white-space: nowrap;

  span {
    margin-left: 10px;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${adjustColorOpacity(colors.turquoise4, 0.2)};
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colors.grey6};
      border-color: ${colors.grey4};
      color: ${colors.grey4};
      pointer-events: none;
    `}
`;
