import styled from "@emotion/styled";
import { CountExtension } from "@remirror/extension-count";
import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { colors } from "../../theme";

interface ICounterProps {
  maximumStrategy?: "characters" | "words";
  maximum: number;
}

const Counter: FC<ICounterProps> = ({
  maximumStrategy = "characters",
  maximum,
}) => {
  const { helpers } = useRemirrorContext({ autoUpdate: true });
  const count =
    maximumStrategy === "characters"
      ? helpers.getCharacterCount()
      : helpers.getWordCount();

  return (
    <CounterIndicator
      color={
        maximum === undefined || count <= maximum ? "inherit" : colors.red2
      }
    >
      {count}
      {maximum !== undefined && ` / ${maximum}`}
    </CounterIndicator>
  );
};

export { Counter, CountExtension };

const CounterIndicator = styled.div<{ color: string }>`
  position: absolute;
  border: 0;
  margin: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  color: ${(props) => props.color};
`;
