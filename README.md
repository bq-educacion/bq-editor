# bq Editor

Simple and Bqeautiful React Rich Text Editor.

## Installation

```
npm i bq-editor
```
```
yarn add bq-editor
```

## Usage

### Render

To render the editor with default extensions we simply do:

```
<Editor />
```

### Extensions

Extensions indicate what type of content the editor can handle.

```
<Editor
  extensions: [[
    {
      name: "heading",
      attrs: {
        levels: [1, 2, 3]
      }
    }, {
      name: "bold"
    }, {
      name: "italic"
    }, {
      name: "underline"
    }
  ], [
    {
      name: "text-align"
    }
  ]]
/>
```

Everything you type will be passed through with keybindings to the extensions.

Users can even bold text via input rules: Type \*\*bold\*\* to add bold text.

Some extensions have additional parameters, run the [storybook](https://github.com/bq-educacion/bq-editor#storybook) or go to the [examples](https://github.com/bq-educacion/bq-editor/tree/main/src/editor/examples) folder to see them.

### Content

Editor provides an `onChange` function to export and save the contents.

```
export const MyEditor = () => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <Editor
      initialContent={JSON.stringify(basic)}
      onChange={setDoc}
    />
  );
};
```

The input content is `ProsemirrorNode` type, except if a specific handler is activated:

- html

```
export const MyEditor = () => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <Editor
      initialContent={html}
      onChange={setDoc}
      stringHandler="html"
    />
  );
};
```

Two remirror functions are exposed to handle html content: `editorNodeToHtml` and `htmlToEditorNode`.

- markdown

```
export const MyEditor = () => {
  const [doc, setDoc] = useState<ProsemirrorNode>();

  return (
    <Editor
      onChange={setDoc}
      stringHandler="markdown"
    />
  );
};
```

Due to the limitations of markdown some extensions do not work.

### Code Editor

The code editor is activated by defining the code language, there is no need to add extensions.

```
<Editor codeLanguage="typescript" />
```

### Visor

To view non-editable content:

```
<Visor content={JSON.stringify(basic)} />
```

Necessary `extensions`, `stringHandler` or `codeLanguage` must be added so visor can interpret the content.

## Storybook

To see more examples and play with them, download the project, install dependencies and run our storybook:

```
yarn storybook:start
```

## Contribute

First of all, thanks for using bq editor!

If you run into any issues, open an issue in our [github repository](https://github.com/bq-educacion/bq-editor) or create a pull request with your improvement proposal, explaining in detail the problem and the solution.

Please be patient, as this is a work in progress project.

## Credits

This editor uses the wonderful [Remirror](https://remirror.io/) React library.

All credits and applause go to the Remirror team.

## License

This project is licensed under the MIT License. See [LICENSE](https://github.com/bq-educacion/bq-editor/LICENSE) file for more details.