import styled from "@emotion/styled";
import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC } from "react";
import { CodeExtension } from "remirror/extensions";
import CodeIcon from "../assets/icons/Code";
import { ToolbarButton } from "../components";

export const CodeName = "code";

export type CodeAttrs = Record<string, never>;

const CodeButton: FC<CodeAttrs> = () => {
  const { to, from } = useCurrentSelection();
  const { active, chain, commands } = useRemirrorContext({ autoUpdate: true });

  return (
    <ToolbarButton
      className={classNames({ active: active.code() })}
      disabled={!commands.toggleCode.enabled()}
      onClick={() => {
        chain.focus({ to, from }).run();
        commands.toggleCode();
      }}
    >
      <StyledIcon>
        <CodeIcon />
      </StyledIcon>
    </ToolbarButton>
  );
};

export { CodeButton, CodeExtension };

const StyledIcon = styled.div`
  display: flex;

  svg {
    height: 12px;
    margin-top: 4px;
  }
`;
