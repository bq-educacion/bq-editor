import React from "react";
import Visor, { IVisorProps } from "../Visor";
import basic from "./content/basic.json";
import code from "./content/code.json";
import html from "./content/html.js";
import markdown from "./content/markdown.js";
import nodeFormatting from "./content/nodeFormatting.json";

export default {
  title: "Visor",
  component: Visor,
};

const Template = (args: IVisorProps) => <Visor {...args} />;

export const Default = Template.bind({});

Default.args = {
  content: JSON.stringify(basic),
};

export const Html = Template.bind({});

Html.args = {
  content: html,
  stringHandler: "html",
};

export const Markdown = Template.bind({});

Markdown.args = {
  content: markdown,
  stringHandler: "markdown",
};

export const Code = Template.bind({});

Code.args = {
  codeEditor: true,
  content: JSON.stringify(code),
};

export const NodeFormatting = Template.bind({});

NodeFormatting.args = {
  content: JSON.stringify(nodeFormatting),
};
