import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { TextHighlightExtension } from "remirror/extensions";
import { colors } from "../../theme";
import Dropdown from "../../atoms/dropdown";
import TextHighlightIcon from "../assets/icons/TextHighlight";
import { ToolbarButton } from "../components";

export const TextHighlightName = "text-highlight";

export type TextHighlightAttrs = {
  color?: string;
  colorPicker?: (onChange: (color?: string) => void) => JSX.Element;
};

const TextHighlightButton: FC<TextHighlightAttrs> = ({
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
          className={classNames({ active: active.textHighlight() })}
          onClick={() => {
            if (colorPicker) {
              setShowModal(!showModal);
            } else {
              active.textHighlight()
                ? commands.removeTextHighlight()
                : commands.setTextHighlight(color);
            }
          }}
        >
          <Color color={color}>
            <TextHighlightIcon />
          </Color>
        </ToolbarButton>
      }
    >
      {colorPicker?.((color) => {
        if (color) {
          commands.setTextHighlight(color);
        } else {
          commands.removeTextHighlight();
        }
      })}
    </ColorDropdown>
  );
};

export { TextHighlightButton, TextHighlightExtension };

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
