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
  const { getWordCount, getCharacterCount, isCountValid } = useHelpers(true);
  const count =
    maximumStrategy === "characters" ? getCharacterCount() : getWordCount();

  return (
    <p
      style={{
        color: maximum === undefined || isCountValid() ? "inherit" : colors.red2,
      }}
    >
      {count}
      {maximum !== undefined && ` / ${maximum}`}
    </p>
  );
};

const Counter: ExtensionType = {
  extensionFunction: { func: CountExtension },
  editorHandler: CounterComponent,
  name: extensions.counter,
};

export default Counter;
