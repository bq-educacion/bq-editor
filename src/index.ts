import { Extension, ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, htmlToEditorNode, Visor } from "./editor";

export { editorNodeToHtml, htmlToEditorNode, Visor };

export type Node = ProsemirrorNode;

export type { Extension };

export default Editor;
