import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC, useState } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../theme";
import TextColorIcon from "../icons/TextColor";
import { Floating, ToolbarButton } from "../components";

export const TextColorName = "text-color";

export type TextColorAttrs = {
  color?: string;
  colorHandler?: (
    onChange: (value?: string) => void,
    value?: string
  ) => JSX.Element;
};

const TextColorButton: FC<TextColorAttrs> = ({
  color: colorProp = colors.orange1,
  colorHandler,
}) => {
  const { active, commands, attrs } = useRemirrorContext({ autoUpdate: true });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Floating
      isOpen={isOpen}
      target={
        <ToolbarButton
          className={cx({ active: active.textColor() })}
          onClick={() => {
            if (colorHandler) {
              setIsOpen(true);
            } else {
              active.textColor()
                ? commands.removeTextColor()
                : commands.setTextColor(colorProp);
            }
          }}
        >
          <Color color={colorProp}>
            <TextColorIcon />
          </Color>
        </ToolbarButton>
      }
    >
      {colorHandler?.((value) => {
        if (value) {
          commands.setTextColor(value);
        } else {
          commands.removeTextColor();
        }
        setIsOpen(false);
      }, attrs.textColor()?.color as string)}
    </Floating>
  );
};

export { TextColorButton, TextColorExtension };

const Color = styled.div<{ color: string }>`
  display: flex;

  svg {
    color: ${(props) => props.color};
  }
`;
