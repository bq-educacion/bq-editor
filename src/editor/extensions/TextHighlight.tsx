import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useRef, useState } from "react";
import { TextHighlightExtension } from "remirror/extensions";
import { colors } from "../../theme";
import TextHighlightIcon from "../assets/icons/TextHighlight";
import { Modal, ToolbarButton } from "../components";

export const TextHighlightName = "text-highlight";

export type TextHighlightAttrs = {
  color?: string;
  colorPicker?: (onChange: (color?: string) => void) => JSX.Element;
};

const TextHighlightButton: FC<TextHighlightAttrs> = ({
  color = colors.orange1,
  colorPicker,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { active, commands } = useRemirrorContext({ autoUpdate: true });
  const [showModal, setShowModal] = useState(false);

  return (
    <div ref={ref}>
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
      <ColorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        parentRef={ref}
      >
        {colorPicker?.((color) => {
          if (color) {
            commands.setTextHighlight(color);
          } else {
            commands.removeTextHighlight();
          }
        })}
      </ColorModal>
    </div>
  );
};

export { TextHighlightButton, TextHighlightExtension };

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
