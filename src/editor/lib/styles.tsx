import { adjustColorOpacity, colors } from "../../theme";

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
      margin-block-end: 0;
    }
  }

  // CodeBlock
  pre {
    background-color: ${adjustColorOpacity(colors.grey6, 0.5)};
    padding: 1em;
    margin: 0 !important;
  }

  // Indent
  li:has([data-node-indent]) [data-node-indent],
  li:has([nodeindent]) [nodeindent] {
    margin-left: 0!important;
  }

  li:has([data-node-indent="1"]),
  li:has([nodeindent="1"]) {
    margin-left: 40px;
  }

  li:has([data-node-indent="2"]),
  li:has([nodeindent="2"]) {
    margin-left: 80px;
  }

  li:has([data-node-indent="3"]),
  li:has([nodeindent="3"]) {
    margin-left: 120px;
  }

  li:has([data-node-indent="4"]),
  li:has([nodeindent="4"]) {
    margin-left: 160px;
  }

  li:has([data-node-indent="5"]),
  li:has([nodeindent="5"]) {
    margin-left: 200px;
  }

  li:has([data-node-indent="6"]),
  li:has([nodeindent="6"]) {
    margin-left: 240px;
  }

  li:has([data-node-indent="7"]),
  li:has([nodeindent="7"]) {
    margin-left: 280px;
  }

  li:has([data-node-indent="8"]),
  li:has([nodeindent="8"]) {
    margin-left: 320px;
  }

  li:has([data-node-indent="9"]),
  li:has([nodeindent="9"]) {
    margin-left: 360px;
  }

  li:has([data-node-indent="10"]),
  li:has([nodeindent="10"]) {
    margin-left: 400px;
  }
`;
