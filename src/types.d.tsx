import { FC } from "react";

export enum extensions {
  counter = "counter",
  bold = "bold",
  bulletList = "bulletList",
  code = "code",
  heading = "heading",
  italic = "italic",
  link = "link",
  orderedList = "orderedList",
  placeholder = "placeholder"
}

export type ExtensionType = {
  extensionFunction: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  toolbarHandler?: FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  editorHandler?: FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: extensions;
};
