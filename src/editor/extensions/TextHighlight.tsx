import styled from "@emotion/styled";
import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { TextHighlightExtension } from "remirror/extensions";
import { colors } from "../../theme";
import TextHighlightIcon from "../assets/icons/TextHighlight";
import { ToolbarButton } from "../components";

export const TextHighlightName = "text-highlight";

export type TextHighlightAttrs = {
  color?: string;
};

const TextHighlightButton: FC<TextHighlightAttrs> = ({
  color = colors.orange1,
}) => {
  const { active, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.textHighlight() })}
      onClick={() =>
        active.textHighlight()
          ? commands.removeTextHighlight()
          : commands.setTextHighlight(color)
      }
    >
      <Color color={color}>
        <TextHighlightIcon />
      </Color>
    </ToolbarButton>
  );
};

export { TextHighlightButton, TextHighlightExtension };

const Color = styled.div<{ color: string }>`
  svg {
    color: ${(props) => props.color};
  }
`;
