import Editor from '.';

export default {
  title: "Editor",
  component: Editor
};

export const Default = {
  args: {
    counter: { maximumStrategy: "characters", maximum: 10 },
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
