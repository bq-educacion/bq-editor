import styled from "@emotion/styled";
import { useActive, useCommands } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import ToolbarButton from "../ToolbarButton";

interface ITextColorButtonProps {
  color: string;
}

const TextColorButton: FC<ITextColorButtonProps> = ({
  color = colors.orange1,
}) => {
  const active = useActive();
  const { setTextColor, removeTextColor } = useCommands();

  return (
    <ToolbarButton
      className={classNames({ active: active.textColor({ color }) })}
      onClick={() =>
        active.textColor({ color }) ? removeTextColor() : setTextColor(color)
      }
    >
      <ColorIndicator color={color} />
    </ToolbarButton>
  );
};

export { TextColorButton, TextColorExtension };

const ColorIndicator = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;
