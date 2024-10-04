import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import cx from "classnames";
import React, { FC, useState } from "react";
import { TextHighlightExtension } from "remirror/extensions";
import { colors } from "../theme";
import TextHighlightIcon from "../icons/TextHighlight";
import { ToolbarButton, ToolbarFloating } from "../components";

export const TextHighlightName = "text-highlight";

export type TextHighlightAttrs = {
  color?: string;
  colorHandler?: (
    onChange: (value?: string) => void,
    value?: string
  ) => JSX.Element;
};

const TextHighlightButton: FC<TextHighlightAttrs> = ({
  color: colorProp = colors.orange1,
  colorHandler,
}) => {
  const { active, commands, attrs } = useRemirrorContext({ autoUpdate: true });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToolbarFloating
      isOpen={isOpen}
      target={
        <ToolbarButton
          className={cx({ active: active.textHighlight() })}
          onClick={() => {
            if (colorHandler) {
              setIsOpen(true);
            } else {
              active.textHighlight()
                ? commands.removeTextHighlight()
                : commands.setTextHighlight(colorProp);
            }
          }}
        >
          <Color color={colorProp}>
            <TextHighlightIcon />
          </Color>
        </ToolbarButton>
      }
    >
      {colorHandler?.((value) => {
        if (value) {
          commands.setTextHighlight(value);
        } else {
          commands.removeTextHighlight();
        }
        setIsOpen(false);
      }, attrs.textHighlight()?.highlight as string)}
    </ToolbarFloating>
  );
};

export { TextHighlightButton, TextHighlightExtension };

const Color = styled.div<{ color: string }>`
  display: flex;

  svg {
    color: ${(props) => props.color};
  }
`;
