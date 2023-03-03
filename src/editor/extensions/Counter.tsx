import styled from "@emotion/styled";
import { CountExtension, CountStrategy } from "@remirror/extension-count";
import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { Static } from "remirror";
import { colors } from "../../theme";

export const CounterName = "counter";

export type CounterAttrs = {
  maximumStrategy?: Static<CountStrategy>;
  maximum: number;
};

const CounterIndicator: FC<CounterAttrs> = ({
  maximumStrategy = "characters",
  maximum,
}) => {
  const { helpers } = useRemirrorContext({ autoUpdate: true });
  const count =
    maximumStrategy === "characters"
      ? helpers.getCharacterCount()
      : helpers.getWordCount();

  return (
    <Indicator
      color={
        maximum === undefined || count <= maximum ? "inherit" : colors.red2
      }
    >
      {count}
      {maximum !== undefined && ` / ${maximum}`}
    </Indicator>
  );
};

export { CounterIndicator, CountExtension };

const Indicator = styled.div<{ color: string }>`
  position: absolute;
  border: 0;
  margin: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  color: ${(props) => props.color};
`;
