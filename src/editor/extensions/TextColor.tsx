import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import Dropdown from "../../atoms/dropdown";
import TextColorIcon from "../assets/icons/TextColor";
import { ToolbarButton } from "../components";

export const TextColorName = "text-color";

export type TextColorAttrs = {
  color?: string;
  colorPicker?: (onChange: (color?: string) => void) => JSX.Element;
};

const TextColorButton: FC<TextColorAttrs> = ({
  color = colors.orange1,
  colorPicker,
}) => {
  const { active, commands } = useRemirrorContext({ autoUpdate: true });
  const [showModal, setShowModal] = useState(false);

  return (
    <ColorDropdown
      isOpen={showModal}
      offset="-10 -40"
      onClose={() => setShowModal(false)}
      target={
        <ToolbarButton
          className={classNames({ active: active.textColor() })}
          onClick={() => {
            if (colorPicker) {
              setShowModal(!showModal);
            } else {
              active.textColor()
                ? commands.removeTextColor()
                : commands.setTextColor(color);
            }
          }}
        >
          <Color color={color}>
            <TextColorIcon />
          </Color>
        </ToolbarButton>
      }
    >
      {colorPicker?.((color) => {
        if (color) {
          commands.setTextColor(color);
        } else {
          commands.removeTextColor();
        }
      })}
    </ColorDropdown>
  );
};

export { TextColorButton, TextColorExtension };

const Color = styled.div<{ color: string }>`
  display: flex;

  svg {
    color: ${(props) => props.color};
  }
`;

const ColorDropdown = styled(Dropdown)`
  width: unset;
  padding: 0;
`;
