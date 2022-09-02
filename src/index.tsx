import React from "react";
import ReactDOM from "react-dom";
import Editor, { IEditorProps } from "./editor";

type IRenderEditorProps = {
  element: Element | DocumentFragment;
  args: IEditorProps;
};

export const editor = (props: IRenderEditorProps) => {
  ReactDOM.render(
    <React.StrictMode>
      <Editor {...props.args} />
    </React.StrictMode>,
    props.element
  );
};
