import { useHelpers } from '@remirror/react';
import { FC } from 'react';
import { MarkdownExtension } from 'remirror/extensions';

const MarkdownPreview: FC = () => {
  const { getMarkdown } = useHelpers(true);

  return (
    <pre>
      <code>{getMarkdown()}</code>
    </pre>
  );
}

export { MarkdownExtension, MarkdownPreview };
