import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import { ToolbarButton } from "../components";

interface ITextColorButtonProps {
  color?: string;
}

const TextColorButton: FC<ITextColorButtonProps> = ({
  color = colors.orange1,
}) => {
  const { active, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.textColor({ color }) })}
      onClick={() =>
        active.textColor({ color })
          ? commands.removeTextColor()
          : commands.setTextColor(color)
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
  height: 20px;
  width: 20px;
`;
