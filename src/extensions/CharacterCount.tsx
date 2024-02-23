import {
  PlainExtension,
  EditorState,
  CreateExtensionPlugin,
  Helper,
} from "@remirror/core";
import React, { FC } from "react";
import { colors } from "../theme";
import { useRemirrorContext } from "@remirror/react";
import styled from "@emotion/styled";

export const CharacterCountName = "character-count";

export type CharacterCountAttrs = {
  maxLength: number;
};

const CharacterCountIndicator: FC<CharacterCountAttrs> = ({ maxLength }) => {
  const { helpers } = useRemirrorContext({ autoUpdate: true });
  const count = helpers.getCharacterCount();

  return (
    <Indicator color={count < maxLength ? "inherit" : colors.red2}>
      <span>{`${count} / ${maxLength}`}</span>
    </Indicator>
  );
};

class CharacterCountExtension extends PlainExtension<CharacterCountAttrs> {
  get name() {
    return "character-count" as const;
  }

  createPlugin(): CreateExtensionPlugin {
    const { maxLength } = this.options;
    return {
      appendTransaction: (_transactions, _oldState, newState) => {
        const length = newState.doc.content.size;
        if (maxLength && length > maxLength) {
          return newState.tr.insertText("", maxLength + 1, length);
        }
      },
    };
  }

  getCharacterCount(
    state: EditorState = this.store.getState()
  ): Helper<number> {
    return state.doc.content.size - 2;
  }
}

export { CharacterCountIndicator, CharacterCountExtension };

const Indicator = styled.div<{ color: string }>`
  position: sticky;
  top: 100%;
  text-align: end;
  height: 0;

  > span {
    color: ${(props) => props.color};
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
