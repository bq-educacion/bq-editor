// .storybook/preview.js
import React from "react";

export const decorators = [
  (Story) => (
    <React.StrictMode>
      <Story />
    </React.StrictMode>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const tags = ["autodocs"];

// (Opcional) Capturar errores de consola para tests rápidos en stories
if (typeof window !== "undefined") {
  window.__sbconsole_errors__ = [];
  const origError = console.error.bind(console);
  console.error = (...args) => {
    try {
      window.__sbconsole_errors__.push(args.join(" "));
    } catch {}
    origError(...args);
  };
}
