import { useRemirrorContext } from "@remirror/react";
import React, { FC } from "react";
import { MarkdownExtension } from "remirror/extensions";

const MarkdownPreview: FC = () => {
  const { helpers } = useRemirrorContext({ autoUpdate: true });

  return (
    <pre>
      <code>{helpers.getMarkdown()}</code>
    </pre>
  );
};

export { MarkdownExtension, MarkdownPreview };
