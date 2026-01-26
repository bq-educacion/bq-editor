import colors from "./colors";
import { adjustColorOpacity } from "./utils";

export default `
  // Margins
  > * {
    margin-block-start: 0;

    &:last-child {
      margin-block-end: 0;
    }

    + * {
      margin-block-start: 1em;
    }

    li > * {
      margin-block-start: 0;
      margin-block-end: 0.5em;
    }
  }

  // Color
  mark {
    color: inherit;
  }

  // CodeBlock
  pre {
    background-color: ${adjustColorOpacity(colors.grey6, 0.5)};
    padding: 1em;
    margin: 0 !important;
  }

  // Indent
  ol, ul {
    padding-inline-start: 1.4em;
  }

  li:has([data-node-indent]) [data-node-indent],
  li:has([nodeindent]) [nodeindent] {
    margin-left: 0!important;
  }

  li:has([data-node-indent="1"]),
  li:has([nodeindent="1"]) {
    margin-left: 20px;
  }

  li:has([data-node-indent="2"]),
  li:has([nodeindent="2"]) {
    margin-left: 40px;
  }

  li:has([data-node-indent="3"]),
  li:has([nodeindent="3"]) {
    margin-left: 60px;
  }

  li:has([data-node-indent="4"]),
  li:has([nodeindent="4"]) {
    margin-left: 80px;
  }

  li:has([data-node-indent="5"]),
  li:has([nodeindent="5"]) {
    margin-left: 100px;
  }

  li:has([data-node-indent="6"]),
  li:has([nodeindent="6"]) {
    margin-left: 120px;
  }

  li:has([data-node-indent="7"]),
  li:has([nodeindent="7"]) {
    margin-left: 140px;
  }

  li:has([data-node-indent="8"]),
  li:has([nodeindent="8"]) {
    margin-left: 160px;
  }

  li:has([data-node-indent="9"]),
  li:has([nodeindent="9"]) {
    margin-left: 180px;
  }

  li:has([data-node-indent="10"]),
  li:has([nodeindent="10"]) {
    margin-left: 200px;
  }

  // Force border-collapse: separate for tables with custom cell borders
  table:has(td[data-background-color^="border:"]),
  table:has(th[data-background-color^="border:"]) {
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }

  // Table cell border presets (encoded in data-background-color)
  // Supports both "border:preset" and "border:preset|color" formats
  td[data-background-color^="border:all"],
  th[data-background-color^="border:all"] {
    border-top-width: 1px !important;
    border-top-style: solid !important;
    border-top-color: #000 !important;
    border-right-width: 1px !important;
    border-right-style: solid !important;
    border-right-color: #000 !important;
    border-bottom-width: 1px !important;
    border-bottom-style: solid !important;
    border-bottom-color: #000 !important;
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-left-color: #000 !important;
  }

  td[data-background-color^="border:outer"],
  th[data-background-color^="border:outer"] {
    border-top-width: 1px !important;
    border-top-style: solid !important;
    border-top-color: #000 !important;
    border-right-width: 1px !important;
    border-right-style: solid !important;
    border-right-color: #000 !important;
    border-bottom-width: 1px !important;
    border-bottom-style: solid !important;
    border-bottom-color: #000 !important;
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-left-color: #000 !important;
  }

  td[data-background-color^="border:inner"],
  th[data-background-color^="border:inner"] {
    border-top-width: 1px !important;
    border-top-style: solid !important;
    border-top-color: #000 !important;
    border-right-width: 1px !important;
    border-right-style: solid !important;
    border-right-color: #000 !important;
    border-bottom-width: 1px !important;
    border-bottom-style: solid !important;
    border-bottom-color: #000 !important;
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-left-color: #000 !important;
  }

  td[data-background-color^="border:inner-horizontal"],
  th[data-background-color^="border:inner-horizontal"] {
    border-top-width: 1px !important;
    border-top-style: solid !important;
    border-top-color: #000 !important;
    border-bottom-width: 1px !important;
    border-bottom-style: solid !important;
    border-bottom-color: #000 !important;
  }

  td[data-background-color^="border:inner-vertical"],
  th[data-background-color^="border:inner-vertical"] {
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-left-color: #000 !important;
    border-right-width: 1px !important;
    border-right-style: solid !important;
    border-right-color: #000 !important;
  }

  td[data-background-color^="border:top"],
  th[data-background-color^="border:top"] {
    border-top-width: 1px !important;
    border-top-style: solid !important;
    border-top-color: #000 !important;
  }

  td[data-background-color^="border:bottom"],
  th[data-background-color^="border:bottom"] {
    border-bottom-width: 1px !important;
    border-bottom-style: solid !important;
    border-bottom-color: #000 !important;
  }

  td[data-background-color^="border:left"],
  th[data-background-color^="border:left"] {
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-left-color: #000 !important;
  }

  td[data-background-color^="border:right"],
  th[data-background-color^="border:right"] {
    border-right-width: 1px !important;
    border-right-style: solid !important;
    border-right-color: #000 !important;
  }

  td[data-background-color^="border:none"],
  th[data-background-color^="border:none"] {
    border: none !important;
  }
`;
