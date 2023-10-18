import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, htmlToEditorNode, Visor } from "./editor";
import { Extension as EditorExtension } from "./editor/extensions";
import styles from "./editor/lib/styles";

export { editorNodeToHtml, htmlToEditorNode, styles, Visor };

export type Node = ProsemirrorNode;
export type Extension = EditorExtension;

export default Editor;
