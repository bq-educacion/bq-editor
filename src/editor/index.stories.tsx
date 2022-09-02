import Editor from '.';
import { extensions } from '../types.d';

export default {
  title: "Editor",
  component: Editor
};

export const Default = {
  args: {
    counter: { maximumStrategy: "characters", maximum: 10 },
    extensions: [
      [
        extensions.bold,
        extensions.italic,
        extensions.code,
        extensions.link
      ],
      [
        extensions.heading
      ],
      [
        extensions.bulletList,
        extensions.orderedList
      ],
    ],
    selection: "start",
    placeholder: "Start typing..."
  },
};

export const Html = {
  args: {
    initialContent: "<p>I love <b>HTML</b></p>",
    stringHandler: "html"
  },
};

// export const Markdown = {
//   args: {
//     initialContent: "**Markdown** content is the _best_",
//     stringHandler: "markdown"
//   },
// };
