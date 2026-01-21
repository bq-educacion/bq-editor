import { usePositioner, useRemirrorContext } from "@remirror/react";
import React, { useMemo, useState } from "react";
import { activeCellPositioner } from "remirror/extensions";
import { ToolbarButton, ToolbarFloating } from "./index";
import EllipsisVertical from "../icons/EllipsisVertical";

const TableCellMenuCustom = () => {
  const { commands, chain } = useRemirrorContext({ autoUpdate: true });
  const [isOpen, setIsOpen] = useState(false);

  const positioner = useMemo(() => activeCellPositioner, []);
  const cellPos = usePositioner(positioner, []);

  if (!cellPos.active) return null;

  const run = (fn: () => void) => {
    chain.focus().run();
    fn();
    setIsOpen(false);
  };

  const buttonSize = 20;
  const rightOffset = 19;
  const downOffset = 21;

  return (
    <div
      ref={cellPos.ref}
      style={{
        position: "absolute",
        left: cellPos.x + cellPos.width - buttonSize + rightOffset,
        top: cellPos.y + (cellPos.height - buttonSize) / 2 + downOffset,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <ToolbarFloating
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        keepOpen
        allowedPlacements={["bottom-end"]}
        target={
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setIsOpen((v) => !v)}
            style={{
              width: 20,
              height: 20,
              border: "0px",
              borderRadius: 2,
              background: "#fff",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
            aria-label="Cell menu"
          >
            <EllipsisVertical />
          </button>
        }
      >
        <div
          style={{ display: "flex", flexDirection: "column", minWidth: 180 }}
        >
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.setTableCellBackground.enabled("#b3e5fc")}
            onClick={() =>
              run(() => commands.setTableCellBackground("#b3e5fc"))
            }
          >
            Color jeje
          </ToolbarButton>
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.setTableCellBackground.enabled(null)}
            onClick={() => run(() => commands.setTableCellBackground(null))}
          >
            Remove color
          </ToolbarButton>
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.addTableRowBefore.enabled()}
            onClick={() => run(() => commands.addTableRowBefore())}
          >
            Add row above
          </ToolbarButton>
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.addTableRowAfter.enabled()}
            onClick={() => run(() => commands.addTableRowAfter())}
          >
            Add row below
          </ToolbarButton>
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.addTableColumnBefore.enabled()}
            onClick={() => run(() => commands.addTableColumnBefore())}
          >
            Add column before
          </ToolbarButton>
          <ToolbarButton
            style={{ width: "100%" }}
            disabled={!commands.addTableColumnAfter.enabled()}
            onClick={() => run(() => commands.addTableColumnAfter())}
          >
            Add column after
          </ToolbarButton>
        </div>
      </ToolbarFloating>
    </div>
  );
};

export default TableCellMenuCustom;
