import styled from "@emotion/styled";
import { CountExtension } from "@remirror/extension-count";
import { useHelpers } from "@remirror/react";
import React, { FC } from "react";
import { colors } from "../../theme";
import { extensions, ExtensionType } from "../../types.d";

interface ICounterProps {
  maximumStrategy: "characters" | "words";
  maximum: number;
}

const CounterComponent: FC<ICounterProps> = ({
  maximumStrategy = "characters",
  maximum,
}) => {
  const { getWordCount, getCharacterCount } = useHelpers(true);
  const count =
    maximumStrategy === "characters" ? getCharacterCount() : getWordCount();

  return (
    <CounterIndicator color={maximum === undefined || count <= maximum ? "inherit" : colors.red2}>
      {count}
      {maximum !== undefined && ` / ${maximum}`}
    </CounterIndicator>
  );
};

const Counter: ExtensionType = {
  extensionFunction: CountExtension,
  editorHandler: CounterComponent,
  name: extensions.counter,
};

export default Counter;

const CounterIndicator = styled.div<{ color: string }>`
  position: absolute;
  border: 0;
  transform: translateY(-100%);
  margin: 0;
  right: 0;
  padding: 10px;
  color: ${props => props.color};
`;
