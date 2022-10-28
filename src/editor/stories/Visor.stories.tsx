import React from "react";
import Visor, { IVisorProps } from "../Visor";
import basic from "./content/basic.json";
import html from "./content/html.js";
import markdown from "./content/markdown.js";

export default {
  title: "editor/Visor",
  component: Visor,
};

const Template = (args: IVisorProps) => <Visor {...args} />;

export const Default = Template.bind({});

Default.args = {
  initialContent: JSON.stringify(basic),
};

export const Html = Template.bind({});

Html.args = {
  initialContent: html,
  stringHandler: "html",
};

export const Markdown = Template.bind({});

Markdown.args = {
  initialContent: markdown,
  stringHandler: "markdown",
};
