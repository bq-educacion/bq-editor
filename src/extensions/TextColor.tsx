import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../theme";
import TextColorIcon from "../icons/TextColor";
import { Dropdown, ToolbarButton } from "../components";

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
            if (colorHandler) {
              setShowModal(!showModal);
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
        setShowModal(false);
      }, attrs.textColor()?.color as string)}
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
