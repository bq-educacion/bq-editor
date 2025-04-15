import { PlainExtension, CreateExtensionPlugin } from "@remirror/core";

class TextPlainExtension extends PlainExtension<{
  maxLength?: number;
  preventDropImage?: boolean;
}> {
  get name() {
    return "text-plain" as const;
  }

  createPlugin(): CreateExtensionPlugin {
    const { maxLength, preventDropImage } = this.options;

    return {
      filterTransaction: (transaction, state) => {
        const size = transaction.doc.content.size;
        const nodes = transaction.doc.content["content"] || [];
        if (preventDropImage) {
          // Check if the transaction has any images
          const hasImages = nodes.some((node) =>
            node.content.content.some((child) => child.type.name === "image")
          );
          if (hasImages) {
            return false;
          }
        }
        if (maxLength !== undefined) {
          // Check if the transaction exceeds the maximum length
          const length = size - 2 - (nodes.length - 1);
          const currentSize = state.doc.content.size;
          const currentNodes = state.doc.content["content"] || [];
          const currentLength = currentSize - 2 - (currentNodes.length - 1);
          if (currentLength === length - 1 && length > maxLength) {
            return false;
          }
        }
        return true;
      },
      appendTransaction: (_transactions, _oldState, newState) => {
        const size = newState.doc.content.size;
        const nodes = newState.doc.content["content"] || [];
        if (maxLength !== undefined) {
          // Check if the transaction exceeds the maximum length
          const length = size - (nodes.length - 1);
          if (length > maxLength) {
            return newState.tr.insertText("", maxLength + 1, length);
          }
        }
        return undefined;
      },
    };
  }
}

export { TextPlainExtension };
