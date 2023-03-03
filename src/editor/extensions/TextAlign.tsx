import {
  useCurrentSelection,
  useEditorState,
  useRemirrorContext,
} from "@remirror/react";
import React, { FC } from "react";
import {
  ApplySchemaAttributes,
  EditorState,
  IdentifierSchemaAttributes,
  NodeExtension,
  NodeExtensionSpec,
  NodeSpecOverride,
} from "remirror";
import AlignCenter from "../assets/icons/AlignCenter";
import AlignLeft from "../assets/icons/AlignLeft";
import AlignRight from "../assets/icons/AlignRight";
import { ToolbarButton } from "../components";

const defaultAlign = "left";

export const TextAlignName = "text-align";

export type TextAlignAttrs = Record<string, never>;

export const TextAlignExtraAttributes: IdentifierSchemaAttributes = {
  identifiers: ["paragraph", "heading"],
  attributes: { align: defaultAlign },
};

interface ITextAlignButtonsProps {
  setState: (state: EditorState) => void;
}

const TextAlignButtons: FC<ITextAlignButtonsProps> = ({ setState }) => {
  const state = useEditorState();
  const { $from, $to, empty } = useCurrentSelection();
  const { chain } = useRemirrorContext({ autoUpdate: true });

  const toggleAlign = (align: string) => {
    if (empty) return;
    const tr = state.tr;

    const firstPos = $from.pos - 1;
    let lastPos: number, pos: number;
    pos = firstPos;
    do {
      pos++;
      try {
        tr.setNodeAttribute(pos - 1, "align", align);
        lastPos = pos - 1;
      } catch {
        // Catch is ignored, because there are no errors
      }
    } while (pos < $to.pos - 1);

    const newState = state.apply(tr);
    try {
      chain.focus({ to: lastPos, from: firstPos }).run();
    } catch {
      // Catch is ignored, because there are no errors
    }
    setState(newState);
  };

  return (
    <>
      <ToolbarButton onClick={() => toggleAlign("left")}>
        <AlignLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleAlign("center")}>
        <AlignCenter />
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleAlign("right")}>
        <AlignRight />
      </ToolbarButton>
    </>
  );
};

class TextAlignExtension extends NodeExtension {
  get name() {
    return "textAlign" as const;
  }

  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    return {
      ...override,
      attrs: {
        ...extra.defaults(),
        align: {
          default: defaultAlign,
        },
      },
    };
  }
}

export { TextAlignButtons, TextAlignExtension };
