import { EditorState } from "remirror";

const checkEmptyEditor = (state: EditorState) =>
  state.doc.content.childCount === 1 &&
  state.doc.content.firstChild?.content.childCount === 0;

export default checkEmptyEditor;
