import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import { ToolbarButton } from "../components";

export const TextColorName = "text-color";

export type TextColorAttrs = {
  color?: string;
};

const TextColorButton: FC<TextColorAttrs> = ({ color = colors.orange1 }) => {
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
  border: 1px solid ${colors.grey3};
  border-radius: 4px;
  height: 20px;
  width: 20px;
`;
