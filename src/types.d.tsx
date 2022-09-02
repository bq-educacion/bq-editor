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
}

export const extCounter = [extensions.counter];

export const extHeading = [extensions.heading];

export const extLists = [extensions.bulletList, extensions.orderedList];

export const extRichText = [
  extensions.bold,
  extensions.italic,
  extensions.code,
  extensions.link,
];

export type ExtensionType = {
  extensionFunction: {
    func: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    args?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  toolbarHandler?: FC<any>;
  editorHandler?: FC<any>;
  name: extensions;
};
