import { PlainExtension, CreateExtensionPlugin } from "@remirror/core";

class CharacterCountExtension extends PlainExtension<{ maxLength: number }> {
  get name() {
    return "character-count" as const;
  }

  createPlugin(): CreateExtensionPlugin {
    const { maxLength } = this.options;

    return {
      filterTransaction: (transaction, state) => {
        const size = transaction.doc.content.size;
        const nodes = transaction.doc.content["content"] || [];
        const length = size - 2 - (nodes.length - 1);
        const currentSize = state.doc.content.size;
        const currentNodes = state.doc.content["content"] || [];
        const currentLength = currentSize - 2 - (currentNodes.length - 1);
        if (currentLength === length - 1 && length > maxLength) {
          return false;
        }
        return true;
      },
      appendTransaction: (_transactions, _oldState, newState) => {
        const size = newState.doc.content.size;
        const nodes = newState.doc.content["content"] || [];
        const length = size - (nodes.length - 1);
        if (length > maxLength) {
          return newState.tr.insertText("", maxLength + 1, length);
        }
      },
    };
  }
}

export { CharacterCountExtension };
