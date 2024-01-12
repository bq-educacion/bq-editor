import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, htmlToEditorNode, Visor } from "./Editor";
import { Extension as EditorExtension } from "./extensions";
import styles from "./lib/styles";

export { editorNodeToHtml, htmlToEditorNode, styles, Visor };

export type Node = ProsemirrorNode;
export type Extension = EditorExtension;

export default Editor;
