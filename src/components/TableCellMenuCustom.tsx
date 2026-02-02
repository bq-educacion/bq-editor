import { usePositioner, useRemirrorContext } from "@remirror/react";
import React, { useMemo, useState } from "react";
import { activeCellPositioner } from "remirror/extensions";
import { ToolbarButton, ToolbarFloating } from "./index";
import EllipsisVertical from "../icons/EllipsisVertical";

import {
  BorderIcon,
  IconChevronRight,
  IconBorders,
  IconFill,
  IconMerge,
  IconSplit,
  IconDeleteTable,
  IconDeleteRow,
  IconDeleteColumn,
  type BorderPreset,
} from "../icons/TableCellMenuIcons";

const TableCellMenuCustom = () => {
  const { commands, chain, view } = useRemirrorContext({ autoUpdate: true });
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"fill" | "borders" | null>(
    null
  );
  const [activeBorderPreset, setActiveBorderPreset] =
    useState<BorderPreset>("all");

  const positioner = useMemo(() => activeCellPositioner, []);
  const cellPos = usePositioner(positioner, []);

  if (!cellPos.active) return null;

  const run = (fn: () => void) => {
    chain.focus().run();
    fn();
    setIsOpen(false);
  };

  // Helper to check if merging would result in a single cell (entire table)
  const wouldMergeEntireTable = (): boolean => {
    const { state } = view;
    const { selection } = state;

    // Find the table node
    const { $from } = selection;
    let tableNode = null;

    for (let d = $from.depth; d > 0; d--) {
      const node = $from.node(d);
      if (node.type.name === "table") {
        tableNode = node;
        break;
      }
    }

    if (!tableNode) return false;

    // Count total cells in the table
    let totalCells = 0;
    tableNode.descendants((node) => {
      if (
        node.type.name === "tableCell" ||
        node.type.name === "tableHeaderCell"
      ) {
        totalCells++;
      }
      return true;
    });

    // If table has only 1 cell, don't allow merge
    if (totalCells <= 1) return true;

    // Check if selection spans all cells (CellSelection)
    // @ts-expect-error - CellSelection has $anchorCell and $headCell
    if (selection.$anchorCell && selection.$headCell) {
      // Count selected cells
      let selectedCells = 0;
      // @ts-expect-error - CellSelection has forEachCell method
      selection.forEachCell(() => {
        selectedCells++;
      });

      // If all cells are selected, merging would create a single cell
      if (selectedCells >= totalCells) return true;

      // Check if merging an entire row or column would leave table with only 1 row/column
      const rowCount = tableNode.childCount;
      const colCount = tableNode.firstChild?.childCount || 0;

      // If selecting entire row(s) and only 1 row remains, or entire column(s) and only 1 column remains
      if (rowCount === 1 || colCount === 1) return true;
    }

    return false;
  };

  // Helper to get current cell's background and border preset
  const getCurrentCellAttrs = () => {
    const { state } = view;
    const { selection } = state;
    const { $from } = selection;

    for (let d = $from.depth; d > 0; d--) {
      const node = $from.node(d);
      if (
        node.type.name === "tableCell" ||
        node.type.name === "tableHeaderCell"
      ) {
        return node.attrs.background || null;
      }
    }
    return null;
  };

  // Helper to apply background color while preserving border preset
  const applyBackgroundColor = (color: string) => {
    const currentBg = getCurrentCellAttrs();

    // Extract border preset if it exists
    let borderPreset = null;
    if (currentBg && currentBg.startsWith("border:")) {
      const parts = currentBg.split("|");
      borderPreset = parts[0]; // "border:all", "border:top", etc.
    }

    // Encode: "border:preset|color" or just "color"
    const encodedValue = borderPreset ? `${borderPreset}|${color}` : color;

    commands.setTableCellBackground(encodedValue);
  };

  const applyBorderPreset = (preset: BorderPreset) => {
    setActiveBorderPreset(preset);

    const { state } = view;
    const { selection } = state;
    const { $from } = selection;

    // Find the table cell node by traversing up the tree
    let cellDepth = -1;
    for (let d = $from.depth; d > 0; d--) {
      const node = $from.node(d);
      if (
        node.type.name === "tableCell" ||
        node.type.name === "tableHeaderCell"
      ) {
        cellDepth = d;
        break;
      }
    }

    if (cellDepth === -1) {
      setIsOpen(false);
      setActivePanel(null);
      return;
    }

    const cellNode = $from.node(cellDepth);

    // Encode border preset in background attribute using special prefix
    const currentBg = cellNode.attrs.background || null;

    // Extract actual background color if it exists (remove border: prefix if present)
    let actualBgColor = currentBg;
    if (currentBg && currentBg.startsWith("border:")) {
      const parts = currentBg.split("|");
      actualBgColor = parts[1] || null;
    }

    // Encode: "border:preset|bgcolor" or just "border:preset" if no bgcolor
    const encodedValue = actualBgColor
      ? `border:${preset}|${actualBgColor}`
      : `border:${preset}`;

    chain.focus().setTableCellBackground(encodedValue).run();

    setIsOpen(false);
    setActivePanel(null);
  };

  const fillColors = [
    "#b71c1c",
    "#d32f2f",
    "#f44336",
    "#ff7961",
    "#ffcdd2",
    "#fce4ec",
    "#6a1b9a",
    "#8e24aa",
    "#ab47bc",
    "#ce93d8",
    "#ede7f6",
    "#e3f2fd",
    "#0d47a1",
    "#1565c0",
    "#1e88e5",
    "#90caf9",
    "#bbdefb",
    "#e3f2fd",
    "#004d40",
    "#00695c",
    "#00897b",
    "#4db6ac",
    "#b2dfdb",
    "#e0f2f1",
    "#1b5e20",
    "#2e7d32",
    "#43a047",
    "#81c784",
    "#c8e6c9",
    "#e8f5e9",
  ];

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
        setIsOpen={(v) => {
          setIsOpen(v);
          if (!v) setActivePanel(null);
        }}
        allowedPlacements={["left-start", "left-end"]}
        target={
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setIsOpen((v) => {
                const next = !v;
                if (!next) setActivePanel(null);
                return next;
              });
            }}
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 160,
              borderRight: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "space-between",
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingLeft: 12,
              }}
              onClick={() =>
                setActivePanel((p) => (p === "fill" ? null : "fill"))
              }
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingRight: 6,
                }}
              >
                <IconFill />
                <span>Color de relleno</span>
              </span>
              <span
                style={{ opacity: 0.6, marginLeft: "auto", paddingRight: 6 }}
              >
                <IconChevronRight />
              </span>
            </ToolbarButton>

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "space-between",
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingLeft: 12,
              }}
              onClick={() =>
                setActivePanel((p) => (p === "borders" ? null : "borders"))
              }
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconBorders />
                <span>Bordes</span>
              </span>
              <span
                style={{ opacity: 0.6, marginLeft: "auto", paddingRight: 6 }}
              >
                <IconChevronRight />
              </span>
            </ToolbarButton>

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "flex-start",
                borderRadius: 0,
                paddingLeft: 12,
              }}
              disabled={
                !commands.mergeTableCells.enabled() || wouldMergeEntireTable()
              }
              onClick={() => run(() => commands.mergeTableCells())}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconMerge />
                <span>Unir celdas</span>
              </span>
            </ToolbarButton>

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "flex-start",
                borderRadius: 0,
                paddingLeft: 12,
              }}
              disabled={!commands.splitTableCell.enabled()}
              onClick={() => run(() => commands.splitTableCell())}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconSplit />
                <span>Separar celdas</span>
              </span>
            </ToolbarButton>

            <div
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: 4 }}
            />

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "flex-start",
                borderRadius: 0,
                paddingLeft: 12,
              }}
              disabled={!commands.deleteTableRow.enabled()}
              onClick={() => run(() => commands.deleteTableRow())}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconDeleteRow />
                <span>Eliminar fila</span>
              </span>
            </ToolbarButton>

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "flex-start",
                borderRadius: 0,
                paddingLeft: 12,
              }}
              disabled={!commands.deleteTableColumn.enabled()}
              onClick={() => run(() => commands.deleteTableColumn())}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconDeleteColumn />
                <span>Eliminar columna</span>
              </span>
            </ToolbarButton>

            <ToolbarButton
              style={{
                width: "100%",
                justifyContent: "flex-start",
                borderRadius: 0,
                paddingLeft: 12,
              }}
              disabled={!commands.deleteTable.enabled()}
              onClick={() => run(() => commands.deleteTable())}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconDeleteTable />
                <span>Eliminar tabla</span>
              </span>
            </ToolbarButton>
          </div>

          {activePanel === "fill" && (
            <div
              style={{
                padding: 8,
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 0.1fr)",
                  gap: 0,
                }}
              >
                {fillColors.map((c, idx) => (
                  <button
                    key={`${c}-${idx}`}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => run(() => applyBackgroundColor(c))}
                    style={{
                      width: 32,
                      height: 24,
                      borderRadius: 2,
                      border: "1px solid #fff",
                      background: c,
                      cursor: "pointer",
                    }}
                    aria-label={`Fill ${c}`}
                  />
                ))}
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <ToolbarButton
                  style={{ minWidth: 100, justifyContent: "center" }}
                  disabled={!commands.setTableCellBackground.enabled(null)}
                  onClick={() => run(() => applyBackgroundColor("transparent"))}
                >
                  Sin color
                </ToolbarButton>
              </div>
            </div>
          )}

          {activePanel === "borders" && (
            <div
              style={{
                padding: 8,
                display: "grid",
                gridTemplateColumns: "repeat(3, 0.1fr)",
                gap: 2,
              }}
            >
              {(
                [
                  "all",
                  "outer",
                  "inner",
                  "top",
                  "bottom",
                  "left",
                  "right",
                  "inner-vertical",
                  "inner-horizontal",
                  "none",
                ] as BorderPreset[]
              ).map((preset) => (
                <ToolbarButton
                  key={preset}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    gap: 8,
                    borderRadius: 6,
                    padding: "10px 8px",
                    background:
                      preset === activeBorderPreset
                        ? "rgba(0,0,0,0.06)"
                        : undefined,
                  }}
                  aria-label={preset}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyBorderPreset(preset)}
                >
                  <BorderIcon preset={preset} />
                </ToolbarButton>
              ))}
            </div>
          )}
        </div>
      </ToolbarFloating>
    </div>
  );
};

export default TableCellMenuCustom;
