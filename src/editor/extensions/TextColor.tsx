import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { TextColorExtension } from "remirror/extensions";
import { colors } from "../../theme";
import TextColorIcon from "../assets/icons/TextColor";
import { Modal, ToolbarButton } from "../components";

export const TextColorName = "text-color";

export type TextColorAttrs = {
  color?: string;
  colorPicker?: (onChange: (color?: string) => void) => JSX.Element;
};

const TextColorButton: FC<TextColorAttrs> = ({
  color = colors.orange1,
  colorPicker,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { active, commands } = useRemirrorContext({ autoUpdate: true });
  const [showModal, setShowModal] = useState(false);

  return (
    <div ref={ref}>
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
      <ColorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        parentRef={ref}
      >
        {colorPicker?.((color) => {
          if (color) {
            commands.setTextColor(color);
          } else {
            commands.removeTextColor();
          }
        })}
      </ColorModal>
    </div>
  );
};

export { TextColorButton, TextColorExtension };

const Color = styled.div<{ color: string }>`
  display: flex;

  svg {
    color: ${(props) => props.color};
  }
`;

const ColorModal = styled(Modal)`
  width: unset;
  padding: 0;
`;
