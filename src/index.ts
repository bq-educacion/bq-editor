import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, htmlToEditorNode, Visor } from "./editor";
import { Extension as EditorExtension } from "./editor/extensions";

export { editorNodeToHtml, htmlToEditorNode, Visor };

export type Node = ProsemirrorNode;
export type Extension = EditorExtension;

export default Editor;
