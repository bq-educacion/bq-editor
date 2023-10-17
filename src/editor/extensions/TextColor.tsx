import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import TextColor from "../assets/icons/TextColor";
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
      <Color color={color}>
        <TextColor />
      </Color>
    </ToolbarButton>
  );
};

export { TextColorButton, TextColorExtension };

const Color = styled.div<{ color: string }>`
  svg {
    color: ${(props) => props.color};
  }
`;
