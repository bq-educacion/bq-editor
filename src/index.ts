import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, htmlToEditorNode, Visor } from "./Editor";
import { Extension as EditorExtension, ImageValueAttrs } from "./extensions";
import { styles } from "./theme";

export { editorNodeToHtml, htmlToEditorNode, styles, Visor };

export type Node = ProsemirrorNode;
export type Extension = EditorExtension;
export type ImageAttrs = ImageValueAttrs;

export default Editor;
